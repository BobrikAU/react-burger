import React from "react";
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({order, ingredients, openModal}) {
  
  const bun = ingredients.find(item => {
    return item._id === order.bun;
  });

  const bunPrice = bun === undefined ? 0 : bun.price;
  
  const othersIngredients = order.others.map((item) => {
    return ingredients.find( meal => {
      return meal._id === item;
    });
  });

  const price = bunPrice * 2 + othersIngredients.reduce(function(previousValue, item) {
    return previousValue + item.price;
  }, 0);

  return (
    <section className={`pl-4 pt-25 pb-3 ${styles.order}`}>
      <ul className={styles.orderStructure}>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
        <ul className={`${othersIngredients.length !== 0 && "mt-4 mb-4 pr-4"} ${styles.othersIngredients}`}>
          {othersIngredients.map((item, index) => {
            return (<li className={`pl-4 ${styles.otherIngredient}`} key={index}>
                      <DragIcon type="primary" />
                      <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
                    </li>)
          })}
        </ul>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
      </ul>
      <div className={`mt-10 mb-10 ${styles.finishOrder} pr-4`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }),
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
  openModal: PropTypes.func
}

export default BurgerConstructor;