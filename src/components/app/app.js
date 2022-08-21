import React from 'react';
import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppHeader from '../appHeader/appHeader';
import Constructor from '../../pages/constructor';
import NotFound404 from '../../pages/notFound404';
import Registration from '../../pages/registration';
import Authorization from '../../pages/authorization';
import Recovery from '../../pages/recovery';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';

const App = () => {

  return (
    <div className={`${styles.app} ${styles.variables}`}>
      <AppHeader/>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <Constructor/>
          </Route>
          <Route path='/login' exact={true}>
            <Authorization/>
          </Route>
          <Route path='/register' exact={true}>
            <Registration/>
          </Route>
          <Route path='/forgot-password' exact={true}>
            <Recovery/>
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPassword />
          </Route>
          <Route path='/profile'>
            <Profile />
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
