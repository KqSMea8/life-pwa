import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate(_registration) {
    document.dispatchEvent(new Event('appFoundUpdate'));
  },
  onSuccess(_registration) {
    document.dispatchEvent(new Event('appUpdated'));
  }
});

window.addEventListener('beforeinstallprompt', (beforeInstallPromptEvent: any) => {
  if (window.location.href.indexOf('/feed') === -1) {
    beforeInstallPromptEvent.preventDefault(); // Prevents immediate prompt display
  }
});
