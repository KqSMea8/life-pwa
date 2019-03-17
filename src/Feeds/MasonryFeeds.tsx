import React, { useState, useRef, useEffect, useContext } from 'react';
import produce from 'immer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useScrollLoadMore } from 'src/hooks/bodyScroll';
import { getFeedsData } from 'src/services';
import { FeedCell } from './FeedCell';
import { DelayRender } from 'src/ui/DelayRender';
import { StoreContext } from 'src/store';
import { Loading } from 'src/ui/Loading';

const FeedWrapper = styled.div`
  padding-top: 44px;
  font-size: 0px;
  white-space: nowrap;
  background-color: rgb(245, 246, 247);
`;

const Column = styled.ul`
  display: inline-block;
  vertical-align: top;
  flex-grow: 0;
  flex-shrink: 0;
  list-style: none;
  overflow-x: hidden;
  margin-left: 9px;
`;

export interface ICell {
  isVideo?: boolean;
  imageUrl: string;
  favour?: boolean;
  favourReceivedCount?: number;
  authorName?: string;
  content?: string;
  imageHeight: number;
  imageWidth: number;
  avatarUrl?: string;
}

function _MasonryFeeds(
  props: RouteComponentProps<{ lang: 'en' | 'jp' | 'pt' }>
) {
  const store = useContext(StoreContext);
  const wrapperDOMRef = useRef<any>();
  const [cells, setCells] = useState<{ left: ICell[]; right: ICell[] }>(
    store.getState().feeds[props.match.params.lang]
  );
  // const [minHeight, setMinHeight] = useState(0);
  const leftRef = useRef<HTMLUListElement | null>(null);
  const rightRef = useRef<HTMLUListElement | null>(null);
  const localState = useRef<{
    leftHeight: number;
    rightHeight: number;
    columnWidth: number;
  }>({
    leftHeight: 0,
    rightHeight: 0,
    columnWidth: 0
  });

  const { loading, isScrolling } = useScrollLoadMore({
    throttleTime: 16,
    loadMore: async pageIndex => {
      const data = await getFeedsData(pageIndex);
      setCells(
        produce(state => {
          data.forEach((d, i) => {
            const imgHeight = getImageHeight(
              d.imageWidth / d.imageHeight,
              localState.current.columnWidth
            );
            const cellHeight = 96 + imgHeight;

            const t =
              localState.current.leftHeight <= localState.current.rightHeight
                ? 'left'
                : 'right';
            state[t].push({
              ...d,
              imageHeight: imgHeight,
              imageWidth: localState.current.columnWidth
            });
            localState.current[t + 'Height'] += cellHeight;
          });
        })
      );
      return pageIndex < 50;
    }
  });

  useEffect(() => {
    localState.current.columnWidth = Math.floor(
      (window.screen.availWidth - 27) / 2
    );
  }, []);

  useEffect(() => {
    // 离开时记录一下滚动条位置
    return () => {
      const lang = props.match.params.lang;
      const scrollTop =
        document.body.scrollTop || document.documentElement!.scrollTop;
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'instant'
      } as any);
      store.setState(s => {
        s.feeds[lang + 'ScrollTop'] = scrollTop;
      });
    };
  }, [props.location.pathname]);

  useEffect(() => {
    store.setState(s => {
      s.feeds[props.match.params.lang] = cells;
    });
  }, [cells]);

  return (
    <>
      <FeedWrapper
        ref={wrapperDOMRef}
        style={{
          minHeight: store.getState().feeds[props.match.params.lang + 'ScrollTop']
        }}
        className={isScrolling ? 'scrolling' : undefined}
      >
        <Column key={props.match.params.lang + 'L'} ref={leftRef} style={{ width: localState.current.columnWidth }}>
          {cells.left.map((cell, i) => {
            return (
              <DelayRender transition={true} key={i}>
                <FeedCell cell={cell} />
              </DelayRender>
            );
          })}
        </Column>
        <Column
          key={props.match.params.lang + 'R'}
          ref={rightRef}
          style={{ width: localState.current.columnWidth }}
        >
          {cells.right.map((cell, i) => {
            return (
              <DelayRender transition={true} key={i}>
                <FeedCell cell={cell} />
              </DelayRender>
            );
          })}
        </Column>
      </FeedWrapper>
      <Loading loading={loading} style={{ padding: '5px 0' }} />
    </>
  );
}

export const MasonryFeeds = withRouter(_MasonryFeeds);

function getImageHeight(ratio: number, width: number): number {
  if (ratio >= 1) {
    return width;
  }
  return Math.floor(width / ratio);
}
