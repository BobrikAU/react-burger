import { useEffect, useMemo } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orderFeed.module.css';
import OrderInShort from '../components/orderInShort/orderInShort';
import { v4 as uuidv4 } from 'uuid';
import { getIngredients } from '../services/actions/burgerIngredients';

function OrderFeed() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerIngredients);
  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
    dispatch(changeActivePageActionCreator('orders'));
  }, [dispatch]);
  const allOrders = useSelector(state => state.orders.allOrders);
  const ordersArray = useMemo(() => {
    return allOrders.map((item) => {
      const { numberOrder, orderTime, burgerName, idIngredients, price } = item;
      return (
        <OrderInShort numberOrder={numberOrder} 
                      orderTime={orderTime} 
                      burgerName={burgerName}
                      idIngredients={idIngredients}
                      price={price}
                      key={uuidv4()}
                      />
      );
    });
  }, [allOrders]);
  //const { numberOrder, orderTime, burgerName, idIngredients, price } = allOrders[0];

  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 ${styles.heading}`}>Лента заказов</h1>
      <section className={`pr-2 ${styles.orders}`}>
        {/*<OrderInShort numberOrder={numberOrder} 
                      orderTime={orderTime} 
                      burgerName={burgerName}
                      idIngredients={idIngredients}
                      price={price}
                      />*/}
        {ordersArray}
      </section>
    </main>
  )
}

export default OrderFeed;