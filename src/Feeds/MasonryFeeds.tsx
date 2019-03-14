import React, { useState, useRef, useEffect } from 'react';
import produce from 'immer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useScrollLoadMore } from 'src/hooks/bodyScroll';
import { getFeedsData } from 'src/services';
import { FeedCell } from './FeedCell';
import { DelayRender } from 'src/ui/DelayRender';

const FeedWrapper = styled.div`
  padding-top: 44px;
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
  const [cells, setCells] = useState<{ left: ICell[]; right: ICell[] }>({
    left: [],
    right: []
  });
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

  return (
    <>
      <FeedWrapper className={isScrolling ? 'scrolling' : undefined}>
        <Column ref={leftRef} style={{ width: localState.current.columnWidth }}>
          {cells.left.map((cell, i) => {
            return (
              <DelayRender transition={true} key={i}>
                <FeedCell cell={cell} />
              </DelayRender>
            );
          })}
        </Column>
        <Column
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
      {loading && <h1>loading...</h1>}
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
