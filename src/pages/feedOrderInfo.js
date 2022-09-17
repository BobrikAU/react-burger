import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector } from 'react-redux';
import styles from './feedOrderInfo.module.css';

function FeedOrderInfo() {
  const allOrders = useSelector(state => state.orders.allOrders.orders);

  return(
    <main className={styles.main}>
      <OrderInfo orders={allOrders}/>
    </main>
  )
}

export default FeedOrderInfo;