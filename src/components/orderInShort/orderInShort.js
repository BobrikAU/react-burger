import styles from './orderInShort.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInShort({ numberOrder, orderTime, burgerName, idIngredients, price }) {
  const ingredients = useSelector(state => state.burgerIngredients);

  //создаем ряд картинок с ингредиентами
  const burgerIngredients = useMemo(() => 
    ingredients ? idIngredients.map((item, index) => {
      if (index <= 5) {
      const ingredient = ingredients.find((i) => {
        return item === i._id
      })
      const zIndex = idIngredients.length - index;
      const moreMaximum = index === 5 ? String(idIngredients.length - 6) : false;
      return (
        <div key={uuidv4()} 
             className={`${styles.imageContainer} ${!!moreMaximum && styles.manyIngredients}`} 
             style={{zIndex: zIndex}}>
          <img src={ingredient.image} 
               alt={ingredient.name} 
               style={{zIndex: zIndex}}
               className={styles.image}/>
          {!!moreMaximum && (<span className={`text text_type_main-default ${styles.additionalIngredients}`}>{`+${moreMaximum}`}</span>)}
        </div>
      )}
      return null;
    }) : undefined
  , [ingredients, idIngredients]);

  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 mb-4 ${styles.container}`}>
      <span className={`text text_type_digits-default ${styles.numberOrder}`}>
        {`#${numberOrder}`}
      </span>
      <span className={`text text_type_main-default text_color_inactive ${styles.orderTime}`}>
        {orderTime}
      </span>
      <span className={`text text_type_main-medium ${styles.burgerName}`}>
        {burgerName}
      </span>
      <div className={styles.ingredientsCotnainer}>
        {burgerIngredients}
      </div>
      <div className={`pl-5 ${styles.priceContainer}`} 
        style={{zIndex: ingredients && idIngredients.length}}>
        <span className='text text_type_digits-default mr-2'>{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}

OrderInShort.propTypes = {
  numberOrder: PropTypes.string.isRequired,
  orderTime: PropTypes.string.isRequired,
  burgerName: PropTypes.string.isRequired,
  idIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
}

export default OrderInShort;