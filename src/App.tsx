import * as React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import message from '../locale/#{locale}/message.json';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo className="App-logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.你好}, {message.世界}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
