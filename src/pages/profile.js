import { Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './profile.module.css';
import EditProfile from '../components/editProfile/editProfile';
import OrdersHistory from './ordersHistory';

function Profile () {
  const [ isActive, setIsActive ] = useState('profile');
  const onClickProfile = () => {
    setIsActive('profile');
  };
  const onClickOrders = () => {
    setIsActive('orders');
  };

  return(
    <main className={styles.main}>
      <aside className={`mt-30 ${styles.aside}`}>
        <menu className={styles.menu}>
          <Link 
            className={`text text_type_main-medium text_color_inactive pt-5 pb-3 
              ${styles.link} ${ isActive === 'profile' && styles.linkActive}`} 
            to='/profile' 
            onClick={onClickProfile}>
            Профиль
          </Link>
          <Link 
            className={`text text_type_main-medium text_color_inactive pt-5 pb-3 
              ${styles.link} ${ isActive === 'orders' && styles.linkActive}`} 
            to='/profile/orders' 
            onClick={onClickOrders}>
            История заказов
          </Link>
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
            <Route path='/profile' exact={true}>
              <EditProfile/>
            </Route>
            <Route path='/profile/orders' exact={true}>
              <OrdersHistory/>
            </Route>
          </Switch>
      </section>
    </main>
  )
}

export default Profile;