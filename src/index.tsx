import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { App } from './components/app';
import { DetailsPage } from './components/pages/details';
import { RootPage } from './components/pages/root';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Switch>
        <Route path="/" exact component={RootPage} />
        <Route path="/details/:id" component={DetailsPage} />
      </Switch>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
