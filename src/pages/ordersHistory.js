import styles from './ordersHistory.module.css';
import OrderInShort from '../components/orderInShort/orderInShort';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import { getIngredients } from '../services/actions/burgerIngredients';
import Loader from '../images/loader.gif';
import  { socketStartHistoryActionCreator, 
          WS_CONNECTION_BREAK } from '../services/actions/socketMiddleware';

function OrdersHistory() {
  const [isRequest, setIsRequest] = useState(true);
  const dispatch = useDispatch();
  const { userOrders, ingredients } = useSelector(state => ({
    userOrders: state.orders.userOrders,
    ingredients: state.burgerIngredients
  }));
  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }else {
      setIsRequest(false);
    }
    dispatch(changeActivePageActionCreator('account'));
    if (ingredients) {
      dispatch(socketStartHistoryActionCreator())
    }
    return () => {
      dispatch({type: WS_CONNECTION_BREAK});
    }
  }, [dispatch, ingredients]);

  const currentDate = new Date(new Date().toDateString());
  const cardsUserOrders = userOrders.map((item) => {
    const { number, createdAt, name, ingredients, status } = item;
    return (
      <OrderInShort numberOrder={number} 
                    orderTime={createdAt} 
                    burgerName={name}
                    idIngredients={ingredients}
                    currentDate={currentDate}
                    status={status}
                    key={uuidv4()}
                    orders={userOrders}
                    />
    );
  });
  return isRequest ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <div className={`mt-10 pt-1 pr-3 ${styles.container}`}>
      {cardsUserOrders}
    </div>
  )
}

export default OrdersHistory;