import { Route, Switch, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import EditProfile from '../components/editProfile/editProfile';
import OrdersHistory from './ordersHistory';
import { changeActivePageActionCreator, 
         closeModal, 
         openModalActionCreator } from '../services/actions/app';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import './profile.css';
import { requestAboutUser, eraseUserActionCreator } from '../services/actions/user';
import Modal from '../components/modal/modal';
import ErrorMessage from '../components/errorMassege/errorMassege';
import { setCookie } from '../utils/utils';

function Profile () {

  const dispatch = useDispatch();
  const { isModalActive, message } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));
  const history = useHistory();

  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch]);

  const {path} = useRouteMatch();

  
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });
  const logOutAccount = (e) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Выходим из аккаунта...'));
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(requestAboutUser(
      {
        "token": refreshToken
      },
      'auth/logout',
      setIsRequestSuccessful
    ));
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      closeModalWithDispatch();
      dispatch(eraseUserActionCreator);
      setCookie('accessToken', '', {'max-age': -1});
      localStorage.removeItem('refreshToken');
      history.replace({pathname: '/'});
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

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
          <Button type="secondary" size="medium" onClick={logOutAccount}>Выход</Button>
        </menu>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>
      <section className={`pt-30 ml-15 ${styles.content}`}>
          <Switch>
            <Route path={path} exact={true}>
              <EditProfile/>
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