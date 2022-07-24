import React, { useContext, useEffect, useState } from 'react';
import styles from './orderDetails.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/appContext';
import { urlSendOrder } from '../../utils/utils';

function OrderDetails() {

  const [order, setOrder] = useContext(OrderContext);

  const [request, setRequest] = useState({
                                            isActive: true,
                                            message: ''
                                          });

  useEffect(() => {
    function sendOrder() {
      setRequest({
                    ...request,
                    message: 'Отправляем заказ...'
                  });
      const listIngredients = [...order.others];
      listIngredients.push(order.bun);
      fetch(urlSendOrder, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "ingredients": listIngredients
          })
        })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Код ошибки: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setOrder({
                      ...order,
                      number: String(data.order.number)
                    });
          setRequest({
                        isActive: false,
                        message: ''
                      })
        })
        .catch((err) => {
          setRequest({
                        ...request,
                        message: `Оправка заказа была неудачной. ${err}. Закройте окно
                                  и отправте заказ заново.`
                      });
        })
    };
    sendOrder();
  }, [])

  return(
    request.isActive ?
      (
        <>
          <p className="text text_type_main-medium mt-8">{request.message}</p>
        </>
      ) :
      (<>
        <h2 className="text text_type_digits-large mt-20">{order.number}</h2>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <div className={`mt-15 ${styles.iconContainer}`}>
          <CheckMarkIcon type='primary'/>
        </div>
        <p className='text text_type_main-default mt-15'>{order.execution}</p>
        <p className='text text_type_main-default text_color_inactive mt-2 mb-15'>Дождитесь готовности на орбитальной станции</p>
      </>)
    
  )
}

export default OrderDetails;