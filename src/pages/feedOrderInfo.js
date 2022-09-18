import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector, useDispatch } from 'react-redux';
import styles from './feedOrderInfo.module.css';
import { useEffect } from 'react';
import { getIngredients } from '../services/actions/burgerIngredients';
import loader from '../images/loader.gif';
import { socketStartFeedActionCreator } from '../services/actions/socketMiddleware';
import { changeActivePageActionCreator } from '../services/actions/app';
import { WS_CONNECTION_BREAK } from '../services/actions/socketMiddleware';

function FeedOrderInfo() {
  const { allOrders, burgerIngredients } = useSelector(state => ({
    allOrders: state.orders.allOrders.orders,
    burgerIngredients: state.burgerIngredients
  }));
  //const allOrders = useSelector(state => state.orders.allOrders.orders);
  //const burgerIngredients = useSelector(state => state.burgerIngredients);
  const dispatch = useDispatch();
  console.log()
  useEffect(() => {
    if (!burgerIngredients) {
      dispatch(getIngredients());
    }
    dispatch(changeActivePageActionCreator('orders'));
  }, [dispatch, burgerIngredients]);
  
  useEffect(() => {
    if (!allOrders && burgerIngredients) {
      dispatch(socketStartFeedActionCreator())
    }
    return () => {
      if (allOrders) {
        dispatch({type: WS_CONNECTION_BREAK})
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