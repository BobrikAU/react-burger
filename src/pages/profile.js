import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import styles from './profile.module.css';
import EditProfile from '../components/editProfile/editProfile';
import OrdersHistory from './ordersHistory';
import { changeActivePageActionCreator } from '../services/actions/app';

function Profile () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch]);

  const {path} = useRouteMatch();

  return(
    <main className={styles.main}>
      <aside className={`mt-30 ${styles.aside}`}>
        <menu className={styles.menu}>
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
          <button className={`text text_type_main-medium text_color_inactive pt-6 pb-3
            ${styles.button}`}>
            Выход
          </button>
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
    </main>
  )
}

export default Profile;