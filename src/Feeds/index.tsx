import React, { useContext, useEffect } from 'react';
import { BannerWrapper } from 'ui/BannerWrapper';
import InkSwitch from 'ui/InkSwitch';
import { SwitchLabel } from 'ui/SwitchLabel';
import { RouteComponentProps } from 'react-router';
import { MasonryFeeds } from './MasonryFeeds';
import { StoreContext } from 'src/store';

export function Feeds(
  props: RouteComponentProps<{ lang: 'en' | 'jp' | 'pt' }>
) {
  const store = useContext(StoreContext);
  useEffect(() => {
    const lang = props.match.params.lang;
    const scrollTop = store.getState().feeds[lang + 'ScrollTop'];
    window.scrollTo({ top: scrollTop, behavior: 'instant' } as any);
  }, [props.location.pathname]);
  return (
    <>
      <BannerWrapper>
        <InkSwitch
          useAnimation={true}
          focusedIndex={['en', 'jp', 'pt'].indexOf(props.match.params.lang)}
        >
          <SwitchLabel to="/en/feed">English</SwitchLabel>
          <SwitchLabel to="/jp/feed">Japanese</SwitchLabel>
          <SwitchLabel to="/pt/feed">Portuguese</SwitchLabel>
        </InkSwitch>
      </BannerWrapper>
      <MasonryFeeds />
    </>
  );
}
