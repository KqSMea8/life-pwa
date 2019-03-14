import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { mergeClassName } from 'utils/style';
import { unary } from 'utils/curry';
import { withDefaultProps } from 'utils/ts';

const Container = styled.div`
  padding: 11px 10px 0 10px;
  display: flex;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Label = styled.div`
  &:hover {
    cursor: pointer;
  }
  width: 33%;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  height: 100%;
  display: block;
  flex: 1 0 auto;
  text-align: center;
  color: #777777;
  letter-spacing: 0.5px;
  font-size: 14px;
  &.focus {
    font-weight: bolder;
    color: #30302f;
  }
`;

const InkWrapper = styled.div`
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  will-change: transform;
  transform: translateX(0);
  z-index: 1;
  &:hover {
    cursor: default;
  }
`;

const Ink = styled.div`
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 24px;
  height: 3px;
  border-radius: 2px;
  background-color: #ff7b7b;
`;

const inkWrapCX = unary(mergeClassName, 'ink-switch');
const labelCX = unary(mergeClassName, 'ink-switch-label');

const defaultProps = Object.freeze({
  className: '',
  style: {} as React.CSSProperties,
  useAnimation: true
});

type InkSwitchPropsType = {
  focusedIndex: number;
  children: React.ReactNode;
} & typeof defaultProps;

function InkSwitch(props: InkSwitchPropsType) {
  const { children, focusedIndex, className, style, useAnimation } = props;
  const $activeNode = useRef<HTMLDivElement | null>(null);
  const $inkBar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const inkBar = $inkBar.current;
    const activeNode = $activeNode.current;

    if (inkBar && activeNode) {
      inkBar.style.width = `${activeNode.offsetWidth}px`;
      inkBar.style.transform = `translateX(${activeNode.offsetLeft}px)`;
      inkBar.style.webkitTransform = `translateX(${activeNode.offsetLeft}px)`;
    }
  }, [focusedIndex, children]);

  const elements = React.Children.map(children, (child, index) => {
    const focus = index === focusedIndex;
    if (React.isValidElement(child)) {
      return (
        <Label className={labelCX({ focus })} ref={focus ? $activeNode : null}>
          {child}
        </Label>
      );
    } else {
      // console.warn('Invalid children in InkSwitch');
    }
    return null;
  });
  return (
    <Wrapper style={style} className={inkWrapCX(className)}>
      <Container>
        {elements}
        <InkWrapper
          ref={$inkBar}
          style={{
            transform: `translateX(${focusedIndex * 100}%)`,
            width: `${100 / elements.length}%`,
            transition: useAnimation ? 'transform ease-in-out 0.3s' : undefined
          }}
          className="ink-switch-ink"
        >
          <Ink className="ink-switch-ink-highlight" />
        </InkWrapper>
      </Container>
    </Wrapper>
  );
}

export default withDefaultProps(defaultProps, InkSwitch);
