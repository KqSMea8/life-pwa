import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Feeds } from './Feeds';
import { Detail } from './Detail';
import { Notification } from './ui/Notification';

// import message from '../locale/#{locale}/message.json';
import './App.less';
import { StoreProvider } from './store';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/:lang/feed" exact={true} component={Feeds} />
          <Route path="/:lang/detail" component={Detail} />
          <Redirect to="/jp/feed" />
        </Switch>
      </BrowserRouter>
      <Notification />
    </StoreProvider>
  );
}

export default App;
