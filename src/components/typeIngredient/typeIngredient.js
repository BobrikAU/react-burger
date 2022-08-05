import React from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import styles from './typeIngredient.module.css';
import Ingredient from "../ingredient/ingredient";

function TypeIngredient({type, id, children}) {

  const ingredients = useSelector( state => state.burgerIngredients);

  return (
    <li id={id}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {ingredients.map((item) => {
          return item['type'] === type && (
            <Ingredient key={item._id} ingredient={item}/>
          )
        })}
      </ul>
    </li>
  )
}

TypeIngredient.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string
}

export default TypeIngredient;