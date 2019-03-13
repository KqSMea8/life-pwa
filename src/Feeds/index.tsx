import React from 'react';
import { BannerWrapper } from 'ui/BannerWrapper';
import InkSwitch from 'ui/InkSwitch';
import { SwitchLabel } from 'ui/SwitchLabel';
import { RouteComponentProps } from 'react-router';
import { MasonryFeeds } from './MasonryFeeds';

export function Feeds(
  props: RouteComponentProps<{ lang: 'en' | 'jp' | 'pt' }>
) {
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
