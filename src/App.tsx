import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Feeds } from './Feeds';

// import message from '../locale/#{locale}/message.json';
import './App.less';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:lang/feed" exact={true} component={Feeds} />
        <Route path="/:lang/detail">DetailPage</Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
