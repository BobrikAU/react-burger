import { useEffect } from 'react';
import { changeActivePageActionCreator } from '../services/actions/app';
import { useDispatch } from 'react-redux';

function OrderFeed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeActivePageActionCreator('orders'));
  })

  return(
    <main>
      <h1>Лента заказов</h1>
    </main>
  )
}

export default OrderFeed;