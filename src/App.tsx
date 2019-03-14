import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Feeds } from './Feeds';

// import message from '../locale/#{locale}/message.json';
import './App.less';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:lang/feed" exact={true} component={Feeds} />
        <Route path="/:lang/detail">DetailPage</Route>
        <Redirect to="/jp/feed" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
