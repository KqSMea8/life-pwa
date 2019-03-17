import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { withDefaultProps } from 'src/utils/ts';
import { ReactComponent as LoadingIcon } from 'src/ui/icon/loading.svg';
import { emptyObject } from 'src/utils/empty';
import { useImmerState } from 'src/hooks/immer';
import { useRef, useEffect } from 'react';

const defaultProps = Object.freeze({
  loading: true,
  size: 32,
  className: '',
  style: emptyObject,
  type: 'default' as 'default' | 'fixed',
  debounceTime: 150 // 150 ms 内如果取消 loading 效果不应该给用户看到 loading
});

const initialState = Object.freeze({
  visible: false
});
export type LoadingPropsType = typeof defaultProps;
export type LoadingStateType = typeof initialState;

const GlobalRotateStyle = createGlobalStyle`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerWrapper = styled.div<{
  posType: LoadingPropsType['type'];
  visible?: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  transition: opacity linear 0.3s;
  svg {
    z-index: 1;
    animation: rotate infinite 800ms linear;
  }
  span {
    padding-left: 5px;
  }
  opacity: ${props => (props.visible ? 1 : 0)};
  ${props =>
    props.posType === 'fixed'
      ? `
  position: fixed;
  z-index: 9999;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
    right: 0;
  `
      : ''};
`;

export const Loading = withDefaultProps(
  defaultProps,
  React.memo((props => {
    const [state, setState] = useImmerState(initialState);
    const timer = useRef<number>(NaN);

    useEffect(() => {
      if (props.loading) {
        timer.current = window.setTimeout(() => {
          setState(s => {
            s.visible = true;
          });
        }, props.debounceTime);
      }
      return () => {
        clearTimeout(timer.current);
      };
    }, [props.loading]);

    return (
      <>
        <GlobalRotateStyle />
        <SpinnerWrapper
          // tslint:disable-next-line:no-bitwise
          style={{ fontSize: (props.size / 1.8) & -1, ...props.style }}
          className={props.className}
          visible={state.visible}
          posType={props.type}
        >
          <LoadingIcon width={props.size} height={props.size} style={{ color: '#ff5b5b', fontSize: '2em' }} />
          {props.children && <span>{props.children}</span>}
        </SpinnerWrapper>
      </>
    );
  }) as React.SFC<LoadingPropsType>)
);
