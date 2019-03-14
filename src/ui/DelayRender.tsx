// @ts-ignore
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { emptyObject } from 'src/utils/empty';
import { withDefaultProps } from 'src/utils/ts';
import { useImmerState } from 'src/hooks/immer';

const DelayWrapper = styled.div<{ visible: boolean; useTransition?: boolean }>`
  opacity: ${props => (props.visible ? 1 : 0)};
  ${props => (props.useTransition ? 'transition: opacity .2s ease 0s;' : '')}
`;

const defaultProps = Object.freeze({
  delay: 0,
  transition: false,
  className: '',
  style: emptyObject,
  children: undefined as (() => React.ReactNode) | React.ReactNode | undefined
});

const initialState = Object.freeze({
  isRendered: false,
  transitionFired: false
});

export type DelayRenderPropTypes = typeof defaultProps;

export type DelayRenderStateTypes = typeof initialState;

export interface LocalVarType {
  _timer: number;
}

const InternalDelayRender: React.SFC<DelayRenderPropTypes> = props => {
  const { delay, transition, ...rest } = props;
  const local = useRef<LocalVarType>({ _timer: 0 });
  const [state, setState] = useImmerState<DelayRenderStateTypes>(initialState);
  useEffect(() => {
    local.current._timer = setTimeout(() => {
      setState(s => {
        s.isRendered = true;
      });
    }, delay);
    return () => {
      clearTimeout(local.current._timer);
    };
  }, []);

  return (
    <DelayWrapper
      visible={state.isRendered}
      useTransition={transition}
      {...rest}
    />
  );
};

export const DelayRender = withDefaultProps(defaultProps, InternalDelayRender);
