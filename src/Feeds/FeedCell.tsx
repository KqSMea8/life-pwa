import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { ReactComponent as Like } from 'src/ui/icon/like.svg';
import { ReactComponent as Play } from 'src/ui/icon/play.svg';
import { useImmerState } from 'src/hooks/immer';
import { ICoverData } from './MasonryFeeds';
import 'src/ui/icon/like.less';

const PlayStyled = styled(Play)`
  position: absolute;
  top: 50%;
  margin-top: -6vw;
  left: 50%;
  margin-left: -6vw;
  color: #fff;
`;

const CellWrapper = styled.li<{ active: boolean }>`
  position: relative;
  margin-top: 10px;
  background-color: #fff;
  ${props => (props.active ? 'transform: scale(0.98)' : '')};
  transition: transform linear 0.15s;
  display: block;
  width: 100%;
  font-size: 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(190, 198, 200, 0.25);
`;

const PersonaWrapper = styled.div`
  overflow: visible;
  white-space: nowrap;
  > * {
    vertical-align: middle;
  }
`;

const NamePlacehold = styled.span`
  display: inline-block;
  line-height: 18px;
  width: 18px;
  font-size: 12px;
  text-align: center;
  color: #fff;
`;

const Content = styled.p`
  white-space: pre-wrap;
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

const AvatarWrapper = styled.div<{ src?: string }>`
  display: inline-block;
  background-color: #fff;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-size: cover;
  background-position: 50%;
  ${props => (props.src ? `background-image: url("${props.src}")` : '')};
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
  width: 55px;
  line-height: 22px;
  height: 22px;
  white-space: nowrap;
  overflow: visible;
  color: ${({ favour }) => (favour ? '#FF7B7B' : '#d8d8d8')};
  > * {
    vertical-align: middle;
  }
`;

const Text10Px = styled.span`
  display: inline-block;
  color: #929292;
  width: 50px;
  overflow: visible;
  font-size: 20px;
  transform: scale(0.5);
  transform-origin: left center;
`;

function isWebp(url: string) {
  return /\.webp$/.test(url);
}

export const FeedCell = withRouter(
  React.memo(
    (
      props: { cell: ICoverData } & RouteComponentProps<{ lang: 'en' | 'jp' | 'pt' }>
    ) => {
      const { cell } = props;
      const [state, setState] = useImmerState({ active: false });

      const goDetail = useCallback(() => {
        props.history.push(`/${props.match.params.lang}/detail`);
      }, [cell]);

      const handleFocus = useCallback(() => {
        setState(s => {
          s.active = true;
        });
      }, []);

      const handleBlur = useCallback(() => {
        setState(s => {
          s.active = false;
        });
      }, []);

      return (
        <CellWrapper
          onTouchMoveCapture={handleBlur}
          onMouseMove={handleBlur}
          onTouchEndCapture={handleBlur}
          onTouchCancelCapture={handleBlur}
          onTouchStartCapture={handleFocus}
          onMouseDownCapture={handleFocus}
          onMouseUpCapture={handleBlur}
          active={state.active}
        >
          <div
            style={{ position: 'relative' }}
            role="button"
            onClick={goDetail}
          >
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

            {cell.isVideo && <PlayStyled height="12vw" width="12vw" />}
          </div>
          <Content onClick={goDetail}>{cell.content}</Content>
          <AuthorWrapper>
            <Persona name={cell.authorName} avatarUrl={cell.avatarUrl} />
            <Favour count={cell.favourReceivedCount} favour={cell.favour} />
          </AuthorWrapper>
        </CellWrapper>
      );
    }
  )
);

const bgColors = [
  '#1d1d1d',
  '#00a300',
  '#b91d47',
  '#e773bd',
  '#1e7145',
  '#da532c',
  '#2b5797',
  '#00aba9'
];

function Persona(props: { name?: string; avatarUrl?: string }) {
  const { name, avatarUrl } = props;
  if (!name) {
    return null;
  }
  const c = name.charCodeAt(0) || 0;
  const bgColor = bgColors[c % bgColors.length];
  return (
    <PersonaWrapper>
      <AvatarWrapper src={avatarUrl} style={{ backgroundColor: bgColor }}>
        {!avatarUrl && <NamePlacehold>{name[0]}</NamePlacehold>}
      </AvatarWrapper>
      <Text10Px style={{ marginLeft: 6, verticalAlign: 'middle' }}>
        {name}
      </Text10Px>
    </PersonaWrapper>
  );
}

function Favour(props: { count?: number; favour?: boolean }) {
  const { count } = props;
  const [favour, setFavour] = useState(!!props.favour);
  const mountedRef = useRef(false);

  useEffect(() => void (mountedRef.current = true), []);

  return (
    <FavourCount
      className="feed-favour"
      favour={favour}
      onClick={() => setFavour(s => !s)}
    >
      <Like
        className={
          'like-icon' + (mountedRef.current && favour ? ' liked-animate' : '')
        }
        width={12}
        height={12}
        style={{
          transition: 'color 0.3s',
          color: favour ? '#ff7b7b' : '#d8d8d8'
        }}
      />
      <Text10Px style={{ marginLeft: 7 }}>
        {count && prefixCountNumber(count + (favour ? 1 : 0))}
      </Text10Px>
    </FavourCount>
  );
}

function prefixCountNumber(n: number | string): string {
  const rtn = Number(n) || 0;
  return rtn >= 1e4
    ? (Math.round(rtn / 1e2) / 10).toFixed(1) + 'k'
    : String(rtn);
}
