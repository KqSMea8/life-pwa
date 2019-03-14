import React from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrowSVG } from "src/ui/icon/left-arrow.svg";
import { ReactComponent as MoreSVG } from "src/ui/icon/more.svg";

const Container = styled.div`
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0.5px 0 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
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

export function NavigationBar(props) {
  return (
    <Container>
      <LeftArrow />
      <More />
    </Container>
  );
}
