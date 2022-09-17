import OrderInfo from "../components/orderInfo/orderInfo";
import { useSelector } from 'react-redux';
import styles from './ownOrderInfo.module.css';

function OwnOrderInfo() {
  const userOrders = useSelector(state => state.orders.userOrders);

  return(
    <main className={styles.main}>
      <OrderInfo orders={userOrders}/>
    </main>
  )
}

export default OwnOrderInfo;