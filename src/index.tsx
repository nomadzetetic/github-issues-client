import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { App } from './components/app';
import { RootPage } from './components/pages/root';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Route path="/" component={RootPage} />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
