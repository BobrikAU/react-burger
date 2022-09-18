import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector, useDispatch } from 'react-redux';
import styles from './ownOrderInfo.module.css';
import { useEffect } from 'react';
import { getIngredients } from '../services/actions/burgerIngredients';
import loader from '../images/loader.gif';
import { socketStartHistoryActionCreator } from '../services/actions/socketMiddleware';
import { changeActivePageActionCreator } from '../services/actions/app';
import { WS_CONNECTION_BREAK } from '../services/actions/socketMiddleware';

function OwnOrderInfo() {
  const { userOrders, burgerIngredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    burgerIngredients: state.burgerIngredients
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!burgerIngredients) {
      dispatch(getIngredients());
    }
    dispatch(changeActivePageActionCreator('account'));
  }, [dispatch, burgerIngredients]);

  useEffect(() => {
    if (!userOrders.length && burgerIngredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      if (userOrders) {
        dispatch({type: WS_CONNECTION_BREAK})
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