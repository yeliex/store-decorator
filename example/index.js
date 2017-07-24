import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import Store, { combine, create } from '../src/index';
import App from './components/App';

const modules = {
  app: require('./modules/app'),
  user: require('./modules/user')
};

combine(modules);

create({}, typeof window === 'object' ? window.__INITIAL_STATE__ || {} : {}, compose(
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : (f) => f // 调用redux-devtools-extension
));

console.log(Store());

Store().app.fetchAction({
  title: 1
});

ReactDom.render((
  <Provider store={Store()}>
    <App />
  </Provider>
), window.document.getElementById('react-root'));
