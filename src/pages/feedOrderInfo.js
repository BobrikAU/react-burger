import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector, useDispatch } from 'react-redux';
import styles from './feedOrderInfo.module.css';
import { useEffect } from 'react';
import loader from '../images/loader.gif';
import {  socketStartFeedActionCreator, 
          closeWsConnectionActionCreator } from '../services/actions/socketMiddleware';
import { changeActivePageActionCreator } from '../services/actions/app';

function FeedOrderInfo() {
  const { allOrders, burgerIngredients } = useSelector(state => ({
    allOrders: state.orders.allOrders.orders,
    burgerIngredients: state.burgerIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('orders'));
  }, [dispatch, burgerIngredients]);
  
  useEffect(() => {
    if (!allOrders && burgerIngredients) {
      dispatch(socketStartFeedActionCreator())
    }
    return () => {
      if (allOrders) {
        dispatch(closeWsConnectionActionCreator());
      };
    }
  }, [dispatch, burgerIngredients, allOrders]);

  return (allOrders && burgerIngredients) ? (
    <main className={styles.main}>
      <OrderInfo orders={allOrders}/>
    </main>
  ) : (<img src={loader} alt='Загружаем данные...'/>)
}

export default FeedOrderInfo;