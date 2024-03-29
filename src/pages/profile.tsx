import  { Route, 
          Switch, 
          NavLink, 
          useRouteMatch, 
          useHistory, 
          useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "../utils/hooks";
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from './profile.module.css';
import EditProfile from '../components/editProfile/editProfile';
import OrdersHistory from './ordersHistory';
import { changeActivePageActionCreator, 
         closeModal, 
         openModalActionCreator } from '../services/actions/app';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import './profile.css';
import { requestAboutUser, 
         eraseUserActionCreator } from '../services/actions/user';
import Modal from '../components/modal/modal';
import ErrorMessage from '../components/errorMassege/errorMassege';
import { setCookie } from '../utils/utils';
import { eraseUserOrdersActionCreator } from '../services/actions/orders';
import { TIsRequestSuccessful } from '../utils/types';

function Profile () {
  const { isModalActive, message } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
    userName: state.user.userName,
    userEmail: state.user.email,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  
  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch]);

  const {path} = useRouteMatch();
  const { pathname } = useLocation();

  
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState<TIsRequestSuccessful>({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });

  //выход из аккаунта
  const logOutAccount = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Выходим из аккаунта...'));
    new Promise((resolve, reject) => {
      const refreshToken = localStorage.getItem('refreshToken');
      dispatch(requestAboutUser({
        requestOptions: {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              "token": refreshToken
            }
          ),
        },
        endpointUrl: 'auth/logout',
        options: {resolve, reject},
        setIsRequestSuccessful
      }))
    })
    .then(() => {
      closeModalWithDispatch();
      history.replace({pathname: '/login', state: {from: '/profile'}});
      setTimeout(() => {
        dispatch(eraseUserActionCreator());
        dispatch(eraseUserOrdersActionCreator());
        setCookie('accessToken', '', {'max-age': -1, path: '/'});
        localStorage.removeItem('refreshToken');
      }, 1000);
    })    
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      console.log('setIsRequestSuccessful', isRequestSuccessful.value)
      closeModalWithDispatch();
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

  const text = (path: string, pathname: string) => {
    switch (pathname) {
      case `${path}/orders`:
        return 'В этом разделе вы можете просмотреть свою историю заказов';
      case `${path}`:
        return 'В этом разделе вы можете изменить свои персональные данные';
      default:
        return;
    }
  };

  return(
    <main className={styles.main}>
      <aside className={`mt-30 ${styles.aside}`}>
        <menu className={styles.menu} id='menu'>
          <NavLink 
            exact to={path} 
            className={`text text_type_main-medium text_color_inactive pt-5 pb-3 
              ${styles.link}`} 
            activeClassName={`text text_type_main-medium pt-5 pb-3 
            ${styles.link} ${styles.linkActive}`}>
            Профиль
          </NavLink>
          <NavLink  
            to={`${path}/orders`} 
            className={`text text_type_main-medium text_color_inactive pt-5 pb-3 
              ${styles.link}`} 
            activeClassName={`text text_type_main-medium pt-5 pb-3 
            ${styles.link} ${styles.linkActive}`}>
            История заказов
          </NavLink>
          <Button htmlType='button' type="secondary" size="medium" onClick={logOutAccount}>
            Выход
          </Button>
        </menu>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          {text(path, pathname)}
        </p>
      </aside>
      <section className={`ml-10 pl-2 ${styles.content}`}>
          <Switch>
            <Route path={path} exact={true}>
              <EditProfile setIsRequestSuccessful={setIsRequestSuccessful}/>
            </Route>
            <Route path={`${path}/orders`} exact={true}>
              <OrdersHistory/>
            </Route>
          </Switch>
      </section>
      {isModalActive !== '' && (
        <Modal closeModalWithDispatch={closeModalWithDispatch} 
          activeModal={isModalActive}>
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </main>
  )
}

export default Profile;