import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

export interface SwitchLabelPropsType {
  to: string;
  exact?: boolean;
  children: string;
}

const Label = styled.div<{ isMatch: boolean }>`
  line-height: 22px;
  text-align: center;
  font-size: 16px;
  color: ${props => (props.isMatch ? '#ff7b7b' : '#929292')};
  height: 27px;
  font-family: ${props => (props.isMatch ? 'PingFangSC-Medium' : 'PingFangSC-Regular')};
  font-weight: ${props => (props.isMatch ? 500 : 'normal')};
`;

export function SwitchLabel(props: SwitchLabelPropsType) {
  const { to, exact = false, children } = props;
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => {
        return (
          <Label isMatch={!!match}>
            <Link to={to} style={{ textAlign: 'center' }}>
              {children}
            </Link>
          </Label>
        );
      }}
    />
  );
}
