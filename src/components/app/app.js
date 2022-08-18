import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import Constructor from '../../pages/constructor';
import NotFound404 from '../../pages/notFound404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <div className={styles.app}>
      <AppHeader/>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <Constructor/>
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
