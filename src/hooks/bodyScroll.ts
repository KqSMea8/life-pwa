import { useEffect, useState, useCallback, useRef } from 'react';
import { throttle, debounce } from 'lodash-es';

const touchEventNames = Object.freeze([
  'touchstart',
  'touchend',
  'touchcancel',
  'touchmove'
]);
const noop = () => undefined;

export function useBodyScroll(options: {
  callback: () => void;
  throttleTime?: number;
}) {
  const { callback, throttleTime = 0 } = options;
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollingChangeCallbackRef: React.MutableRefObject<
    null | ((isScrolling: boolean) => void)
  > = useRef(null);
  const resetScrollingRef = useRef<{
    resetScrolling: () => void;
  }>({
    resetScrolling: debounce(() => {
      setIsScrolling(false);
    }, throttleTime + 100)
  });

  const cbEx = useCallback(() => {
    const cb = throttleTime
      ? throttle(callback, throttleTime, { trailing: true })
      : callback;
    cb();
    if (!isScrolling) {
      setIsScrolling(true);
    }
    resetScrollingRef.current.resetScrolling();
  }, [callback, throttleTime]);

  useEffect(() => {
    document.addEventListener('scroll', cbEx, { passive: true });
    return () => document.removeEventListener('scroll', cbEx);
  }, [cbEx]);

  useEffect(() => {
    if (isScrolling) {
      touchEventNames.forEach(n => {
        document.addEventListener(n, noop, { passive: true });
      });
    }
    if (scrollingChangeCallbackRef.current) {
      scrollingChangeCallbackRef.current(isScrolling);
    }
    return () => {
      touchEventNames.forEach(n => {
        document.removeEventListener(n, noop);
      });
    }
  }, [isScrolling]);

  return {
    isScrolling,
    unsubscribe() {
      document.removeEventListener('scroll', cbEx);
    }
  };
}

export function useScrollLoadMore(options: {
  throttleTime?: number;
  triggerDistanceToBottom?: number;
  loadMore: (pageIndex: number) => Promise<boolean>;
}) {
  const { loadMore, throttleTime, triggerDistanceToBottom = 100 } = options;
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const callback = useCallback(() => {
    const scrollTop =
      document.body.scrollTop || document.documentElement!.scrollTop;
    const scrollHeight = document.documentElement!.scrollHeight;
    const viewportHeight = window.innerHeight;
    if (
      hasMore &&
      !loading &&
      scrollTop + viewportHeight + triggerDistanceToBottom >= scrollHeight
    ) {
      setPageIndex(s => s + 1);
    }
  }, [hasMore, loading]);

  const { isScrolling, unsubscribe } = useBodyScroll({
    callback,
    throttleTime
  });

  // 发请求的 effect
  useEffect(() => {
    if (!loading && pageIndex >= 1) {
      setLoading(true);
      loadMore(pageIndex).then(
        d => {
          setHasMore(d);
          setLoading(false);
          if (d) {
            // 触发滚动加载，来触发不满页时，继续 loadMore
            setTimeout(() => document.dispatchEvent(new Event('scroll')), 16);
          }
        },
        () => {
          setLoading(false);
        }
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (!hasMore) {
      unsubscribe();
    }
  }, [hasMore]);

  return {
    isScrolling,
    loading
  };
}
