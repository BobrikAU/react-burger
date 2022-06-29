import React from "react";
import styles from './ingridient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function Ingredient(props) {
  return (
    <li className={styles.ingreient}>
      <img src={props.url} className={`mb-2 ${styles.image}`}/>
      <Counter count={0} size="default"/>
      <div className={`mb-2 ${styles.prise}`}>
        <p className={`text text_type_digits-default mr-2 ${styles.priseText}`}>{props.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  url: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
}