import styles from './ordersHistory.module.css';
import OrderInShort from '../components/orderInShort/orderInShort';
import { useSelector, useDispatch } from '../utils/hooks';
import { useEffect } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import Loader from '../images/loader.gif';
import  { socketStartHistoryActionCreator, 
          breakWsConnectionActionCreator } from '../services/actions/socketMiddleware';


import { TOrder } from '../utils/types';

function OrdersHistory() {
  const dispatch = useDispatch();
  const { userOrders, ingredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    ingredients: state.burgerIngredients
  }));
  useEffect(() => {
    dispatch(changeActivePageActionCreator('account'));
    if (ingredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      dispatch(breakWsConnectionActionCreator());
    }
  }, [dispatch, ingredients]);

  // сортировка списка ордеров (новые сверху)
  function compareOrderDate(firstOrder: TOrder, secondOrder: TOrder) {
    return new Date (secondOrder.createdAt).getTime() - new Date (firstOrder.createdAt).getTime();
  }
  userOrders.sort(compareOrderDate);
  
  const currentDate = new Date(new Date().toDateString());
  const cardsUserOrders = userOrders.length !== 0 && userOrders.map((item) => {
    const { number, createdAt, name, ingredients, status, _id } = item;
    return (
      <OrderInShort numberOrder={number} 
                    orderTime={createdAt} 
                    burgerName={name}
                    idIngredients={ingredients}
                    currentDate={currentDate}
                    status={status}
                    key={_id}
                    orders={userOrders}
                    />
    );
  });
  return !ingredients ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <div className={`mt-10 pt-1 pr-3 ${styles.container}`}>
      {cardsUserOrders}
    </div>
  )
}

export default OrdersHistory;