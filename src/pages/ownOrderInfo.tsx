import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector, useDispatch } from '../utils/hooks';
import styles from './ownOrderInfo.module.css';
import { useEffect } from 'react';
import loader from '../images/loader.gif';
import {  socketStartHistoryActionCreator, 
          closeWsConnectionActionCreator } from '../services/actions/socketMiddleware';
import { changeActivePageActionCreator } from '../services/actions/app';

function OwnOrderInfo() {
  const { userOrders, burgerIngredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    burgerIngredients: state.burgerIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch, burgerIngredients]);

  useEffect(() => {
    if (!userOrders.length && burgerIngredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      if (userOrders.length) {
        dispatch(closeWsConnectionActionCreator());
      };
    }
  }, [dispatch, burgerIngredients, userOrders]);

  return (userOrders.length && burgerIngredients) ? (
    <main className={styles.main}>
      <OrderInfo orders={userOrders}/>
    </main>
  ) : (<img src={loader} alt='Загружаем данные...'/>)
}

export default OwnOrderInfo;