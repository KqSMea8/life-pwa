import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styled from "styled-components";
import { ReactComponent as LeftArrowSVG } from "src/ui/icon/left-arrow.svg";
import { ReactComponent as MoreSVG } from "src/ui/icon/more.svg";
import {BannerWrapper} from 'ui/BannerWrapper';

const Container = styled(BannerWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-sizing: border-box;
`;

const LeftArrow = styled(LeftArrowSVG)`
  width: 24px;
  height: 24px;
  color: #252525;
`;

const More = styled(MoreSVG)`
  width: 24px;
  height: 24px;
  color: #252525;
`;

export const NavigationBar = withRouter((props: RouteComponentProps) => {
  const goBack = () => {
    props.history.goBack()
  };
  return (
    <Container>
      <LeftArrow onClick={goBack}/>
      <More />
    </Container>
  );
});
