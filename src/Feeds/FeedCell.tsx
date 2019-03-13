import React, { useState } from 'react';
import styled from 'styled-components';
import { ICell } from './MasonryFeeds';
import { ReactComponent as Like } from 'ui/icon/like.svg';

const CellWrapper = styled.li`
  margin-top: 10px;
  background-color: #fff;
  display: block;
  width: 100%;
  font-size: 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(190, 198, 200, 0.25);
`;

const Content = styled.p`
  padding: 9px 10px 0 10px;
  margin: 0;
  font-size: 13px;
  line-height: 18px;
  height: 36px;
  box-sizing: content-box;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  box-orient: vertical;
  -webkit-box-orient: vertical;
`;

const AvatarImage = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const AuthorWrapper = styled.div`
  padding: 11px 0 8px 10px;
  height: 22px;
  color: #d8d8d8;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: 50% 50%;
`;

const FavourCount = styled.div<{ favour?: boolean }>`
  width: 50px;
  line-height: 22px;
  height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({favour}) => favour ? '#FF7B7B' : '#d8d8d8'};
  padding-right: 10px;
  > * {
    vertical-align: middle;
  }
`;

const Text10Px = styled.span`
  display: inline-block;
  font-size: 20px;
  transform: scale(0.5);
  transform-origin: left center;
`;

function isWebp(url: string) {
  return /\.webp$/.test(url);
}

export const FeedCell = React.memo((props: { cell: ICell }) => {
  const { cell } = props;
  return (
    <CellWrapper>
      <picture>
        {isWebp(cell.imageUrl) && (
          <source type="image/webp" srcSet={cell.imageUrl} />
        )}
        <source
          type="image/*"
          srcSet={cell.imageUrl.replace(/\.webp$/, '.jpg')}
        />
        <Image
          width="100%"
          src={cell.imageUrl}
          style={{ height: cell.imageHeight }}
        />
      </picture>
      <Content>{cell.content}</Content>
      <AuthorWrapper>
        <Persona name={cell.authorName} avatarUrl={cell.avatarUrl} />
        <Favour count={cell.favourReceivedCount} favour={cell.favour} />
      </AuthorWrapper>
    </CellWrapper>
  );
});

function Persona(props: { name?: string; avatarUrl?: string }) {
  const { name, avatarUrl } = props;
  if (!name) {
    return null;
  }
  return (
    <div>
      <AvatarImage src={avatarUrl} />
      <span style={{ marginLeft: 6 }}>{name}</span>
    </div>
  );
}

function Favour(props: { count?: number; favour?: boolean }) {
  const { count } = props;
  const [favour, setFavour] = useState(!!props.favour);
  return (
    <FavourCount
      className="feed-favour"
      favour={favour}
      onClick={() => setFavour(s => !s)}
    >
      <Like width={12} height={12} />
      <Text10Px style={{ marginLeft: 7 }}>{count && prefixCountNumber(count)}</Text10Px>
    </FavourCount>
  );
}

function prefixCountNumber(n: number | string): string {
  const rtn = Number(n) || 0;
  return rtn >= 1e4
    ? (Math.round(rtn / 1e2) / 10).toFixed(1) + 'k'
    : String(rtn);
}
