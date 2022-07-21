import React, { useContext } from "react";
import PropTypes from 'prop-types';
import styles from './typeIngredient.module.css';
import Ingredient from "../ingredient/ingredient";
import { IngredientsContext } from "../../services/appContext";

function TypeIngredient({type, order, id, openModal, children}) {

  const ingredients = useContext(IngredientsContext);

  return (
    <li id={id}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {ingredients.map((item) => {
          return item['type'] === type && (
            <Ingredient key={item._id} order={order} openModal={openModal} 
            ingredient={item}/>
          )
        })}
      </ul>
    </li>
  )
}

TypeIngredient.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  order: PropTypes.shape({
    bun: PropTypes.string,
    others: PropTypes.arrayOf(PropTypes.string)
  }),
  openModal: PropTypes.func,
  id: PropTypes.string
}

export default TypeIngredient;