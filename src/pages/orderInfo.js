import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './orderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useEffect, useState } from 'react';
import { timeString, countingPrice } from '../utils/utils';
import { getIngredients } from '../services/actions/burgerIngredients';
import { changeActivePageActionCreator } from '../services/actions/app';
import Loader from '../images/loader.gif';

function OrderInfo() {
  const { allOrders, burgerIngredients } = useSelector(state => ({
    allOrders : state.orders.allOrders.orders,
    burgerIngredients: state.burgerIngredients,
  }));
  const [isRequest, setIsRequest] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!burgerIngredients) {
      dispatch(getIngredients());
    } else {
      setIsRequest(false);
    }
    dispatch(changeActivePageActionCreator('orders'));
  }, [dispatch, burgerIngredients]);
  const id = parseInt(useParams().id, 10);
  const { number, name, status, ingredients, createdAt } = useMemo(() => {
    const value = allOrders.find((item) => {
        return id === item.number
    });
    return value;
  }, [allOrders, id]);

  const listIngredients = useMemo (() => {
    const value = ingredients.reduce((previousValue, item) => {
      if (previousValue.length === 0) {
        previousValue.push({id: item, volume: 1});
      } else {
        const index = previousValue.findIndex((i) => {
          return i.id === item
        })
        if (index < 0) {
          previousValue.push({id: item, volume: 1});
        } else {
          previousValue[index].volume += 1;
        }
      }
      return previousValue
    }, []);
    return value;
  }, [ingredients]);
  console.log();
  
  const { liste, burgerPrice } = useMemo(() => {
    const value = burgerIngredients ? listIngredients.reduce((previousValue, item) => {
      const ingredientInfo = burgerIngredients.find(i => {
        return i._id === item.id;
      });
      if (ingredientInfo.type === 'bun') {
        item.volume = 2;
      }
      countingPrice(ingredientInfo.type, ingredientInfo.price, previousValue);
      previousValue.liste.push(
        <li key={uuidv4()} className={`mb-4 ${styles.ingredient}`}>
          <div className={styles.container}>
            <img src={ingredientInfo.image} 
                 alt={ingredientInfo.name} 
                 className={styles.image}/>
            <p className='ml-4 text text_type_main-default'>{ingredientInfo.name}</p>
          </div>
          <div className={`mr-6 ${styles.container}`}>
            <span className={`text text_type_digits-default mr-2 ${styles.ingredientPrice}`}>
              {`${item.volume} x ${ingredientInfo.price}`}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      );
      return previousValue;
    }, {burgerPrice: 0, liste: []}) : {burgerPrice: 0, liste: []};
    return value;
  }, [listIngredients, burgerIngredients]);

  const time = timeString(createdAt, new Date(new Date().toDateString()));

  return isRequest ?
  (<img src={Loader} alt='Загружаем данные...'/>) :
  (
    <main className={styles.main}>
      <span className={`text text_type_digits-default mb-10 ${styles.number}`}>{`#${number}`}</span>
      <h1 className='text text_type_main-medium mb-3'>{name}</h1>
      <span className={`text text_type_main-default ${styles.status}`}>{status === 'done' ? 'Выполнен' : 'В работе'}</span>
      <span className='text text_type_main-medium mb-6'>Состав:</span>
      <ul className={`mb-10 ${styles.list}`}>{liste}</ul>
      <div className={styles.timePrice}>
        <p className='text text_type_main-default text_color_inactive'>{time}</p>
        <div className={styles.price}>
          <span className='text text_type_digits-default mr-2'>{burgerPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </main>
  );
}

export default OrderInfo;
