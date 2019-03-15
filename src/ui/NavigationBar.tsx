import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import styled from "styled-components";
import { ReactComponent as LeftArrowSVG } from "src/ui/icon/left-arrow.svg";
import { ReactComponent as MoreSVG } from "src/ui/icon/more.svg";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0.5px 0 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 110;
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

  console.log(props)
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
