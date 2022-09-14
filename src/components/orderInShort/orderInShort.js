import styles from './orderInShort.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInShort({ numberOrder, orderTime, burgerName, idIngredients, currentDate }) {
  const ingredients = useSelector(state => state.burgerIngredients);

  //создаем строку с временем принятия заказа
  const time = () => {
    const [orderDay, other] = orderTime.split('T');
    const orderDate =  new Date(new Date(orderDay).toDateString());
    const pastDays = (currentDate - orderDate) / 86400000;
    let days;
    switch (pastDays) {
      case 0 :
        days = 'Сегодня,';
        break;
      case 1 :
        days = 'Вчера,';
        break;
      default :
        const StringPastDays = String(pastDays);
        const lastGigtPastDays = parseInt(StringPastDays.slice(-1));
        const lastTwoGigtPastDays = parseInt(StringPastDays.slice(-2));
        if (lastGigtPastDays === 1 && lastTwoGigtPastDays > 20) {
          days = `${pastDays} дeнь назад,`;
        } else if (lastGigtPastDays >= 2 && lastGigtPastDays <= 4 && 
            (lastTwoGigtPastDays < 10 || lastTwoGigtPastDays > 21)) {
          days = `${pastDays} дня назад,`;
        } else {
          days = `${pastDays} дней назад,`;
        }
    }
    const time = other.slice(0, 5);
    const gmt = new Date(orderTime).getTimezoneOffset() / -60
    const timeZone = `i-GMT${gmt >=0 && '+'}${gmt}`;
    return `${days} ${time} ${timeZone}`;
  };

  //создаем ряд картинок с ингредиентами и подсчитываем стоимость бургера
  function countingPrice(type, price, previousValue) {
    if (type === "bun") {
      previousValue.burgerPrice += price * 2;
    } else {
      previousValue.burgerPrice += price;
    }
  }
  function makeIngredientIcon(index, image, name, previousValue) {
    if (index <= 5) {
      const zIndex = idIngredients.length - index;
      const moreMaximum = index === 5 ? String(idIngredients.length - 6) : false;
      const imageIngredient = (
        <div key={uuidv4()} 
             className={ `${styles.imageContainer} 
                          ${!!moreMaximum && styles.manyIngredients}`} 
             style={{zIndex: zIndex}}>
          <img src={image} 
               alt={name} 
               style={{zIndex: zIndex}}
               className={styles.image}/>
          {!!moreMaximum && (<span className={`text text_type_main-default ${styles.additionalIngredients}`}>{`+${moreMaximum}`}</span>)}
        </div>
      )
      previousValue.burgerIngredients.push(imageIngredient);
    }
  }
  const {burgerPrice, burgerIngredients} = useMemo(() => {
    const iconsAndPrice = ingredients ? idIngredients.reduce((previousValue, item, index) => {
      const ingredient = ingredients.find((i) => {
        return item === i._id
      })
      countingPrice(ingredient.type, ingredient.price, previousValue);
      makeIngredientIcon(index, ingredient.image, ingredient.name, previousValue);
      return previousValue;
    }, {burgerPrice: 0, burgerIngredients: []}) : {burgerPrice: 0, burgerIngredients: []};
    return iconsAndPrice;
  } , [ingredients, idIngredients]);

  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 mb-4 ${styles.container}`}>
      <span className={`text text_type_digits-default ${styles.numberOrder}`}>
        {`#${String(numberOrder)}`}
      </span>
      <span className={`text text_type_main-default text_color_inactive ${styles.orderTime}`}>
        {time()}
      </span>
      <span className={`text text_type_main-medium ${styles.burgerName}`}>
        {burgerName}
      </span>
      <div className={styles.ingredientsCotnainer}>
        {burgerIngredients}
      </div>
      <div className={`pl-5 ${styles.priceContainer}`} 
        style={{zIndex: ingredients && idIngredients.length}}>
        <span className='text text_type_digits-default mr-2'>{burgerPrice}</span>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}

OrderInShort.propTypes = {
  numberOrder: PropTypes.number.isRequired,
  orderTime: PropTypes.string.isRequired,
  burgerName: PropTypes.string.isRequired,
  idIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentDate: PropTypes.object.isRequired,
}

export default OrderInShort;