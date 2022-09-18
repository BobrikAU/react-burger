import { useEffect, useMemo, useState } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orderFeed.module.css';
import OrderInShort from '../components/orderInShort/orderInShort';
import { v4 as uuidv4 } from 'uuid';
import { getIngredients } from '../services/actions/burgerIngredients';
import Loader from '../images/loader.gif';
import {  socketStartFeedActionCreator,
          WS_CONNECTION_BREAK } from '../services/actions/socketMiddleware';

function OrderFeed() {
  //const [isRequest, setIsRequest] = useState(true);
  const dispatch = useDispatch();
  const { allOrders, totalOrders, totalTodayOrders, ingredients } = useSelector(state => ({
    allOrders: state.orders.allOrders.orders,
    totalOrders: state.orders.allOrders.total,
    totalTodayOrders: state.orders.allOrders.totalToday,
    ingredients: state.burgerIngredients,
  }));
  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }/*else {
      setIsRequest(false);
    }*/
    dispatch(changeActivePageActionCreator('orders'));
    if (ingredients) {
      dispatch(socketStartFeedActionCreator());
    }
    return () => {
      dispatch({type: WS_CONNECTION_BREAK});
    }
  }, [dispatch, ingredients]);

  //формируем карточки заказов
  const currentDate = new Date(new Date().toDateString());
  const ordersArray = useMemo(() => {
    return allOrders && allOrders.map((item) => {
      const { number, createdAt, name, ingredients } = item;
      return (
        <OrderInShort numberOrder={number} 
                      orderTime={createdAt} 
                      burgerName={name}
                      idIngredients={ingredients}
                      currentDate={currentDate}
                      key={uuidv4()}
                      orders={allOrders}
                      />
      );
    });
  }, [allOrders]);

  //формируем перечени заказов готовых и в работе
  const {pendingOrders, doneOrders} = useMemo(() => {
    const lists = allOrders && allOrders.reduce((previousValue, item) => {
      if (item.status === 'done') {
        previousValue.doneOrders.push(<li className='text text_type_digits-default mb-2 mr-2' 
                                          key={uuidv4()}>
                                            {item.number}
                                      </li>);
      } else if (item.status === 'pending') {
        previousValue.pendingOrders.push( <li className='text text_type_digits-default mb-2' 
                                              key={uuidv4()}>
                                                {item.number}
                                          </li>);
      }
      return previousValue;
    }, {pendingOrders: [], doneOrders: []});

    /*if (lists.doneOrders.length > 0) {
      lists.doneOrders = lists.doneOrders.reduce((previousValue, item, index) => {
        if ( index % 10 === 0) {
          previousValue.push([]);
        }
        return previousValue[Math.floor(index)].push(item);
      }, [])
    }*/



    return allOrders ? lists : {pendingOrders: [], doneOrders: []};
  }, [allOrders]);

  return (!allOrders && !ingredients) ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 ${styles.heading}`}>Лента заказов</h1>
      <section className={`pr-2 ${styles.orders}`}>
        {ordersArray}
      </section>
      <section className={styles.stats}>
        <div className={styles.done}>
          <p className={`text text_type_main-medium mb-6 ${styles.name}`}>Готовы:</p>
          <ul className={`${styles.list} ${styles.listDone}`} key={uuidv4()}>
            {doneOrders}
          </ul>
          {/*doneOrders.map((item) => (
            <ul className={`${styles.list} ${styles.listDone}`} key={uuidv4()}>
              {item}
            </ul>
          ))*/}
          
          





        </div>
        <div className={styles.pending}>
          <p className={`text text_type_main-medium mb-6 ${styles.name}`}>В работе:</p>
          <ul className={styles.list}>
            {pendingOrders}
          </ul>
        </div>
        <div className={styles.total}>
          <p className={`text text_type_main-medium ${styles.name}`}>
            Выполнено за все время:
          </p>
          <p className='text text_type_digits-large'>{allOrders && totalOrders.toLocaleString()}</p>
        </div>
        <div className={styles.totalToday}>
          <p className={`text text_type_main-medium ${styles.name}`}>
            Выполнено за сегодня:
          </p>
          <p className='text text_type_digits-large'>{allOrders && totalTodayOrders.toLocaleString()}</p>
        </div>
      </section>
    </main>
  );
}

export default OrderFeed;