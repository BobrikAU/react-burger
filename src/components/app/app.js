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
import ProtectedRoute from '../protectedRoute/protectedRoute';
import RouteNotAuthorized from '../routeNotAuthorized/routeNotAuthorized';
import DetailsIngredient from '../../pages/detailsIngredient';

const App = () => {

  return (
    <div className={`${styles.app} ${styles.variables}`}>
      <BrowserRouter>
        <AppHeader/>
        <Switch>
          <Route path='/' exact={true}>
            <Constructor/>
          </Route>
          <Route path='/ingredients/:_id'>
            <DetailsIngredient />
          </Route>
          <RouteNotAuthorized path='/login' exact={true}>
            <Authorization/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/register' exact={true}>
            <Registration/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/forgot-password' exact={true}>
            <Recovery/>
          </RouteNotAuthorized>
          <RouteNotAuthorized path='/reset-password' exact={true}>
            <ResetPassword />
          </RouteNotAuthorized>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
