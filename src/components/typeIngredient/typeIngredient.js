import React from "react";
import PropTypes from 'prop-types';
import styles from './typeIngredient.module.css';
import Ingredient from "../Ingredient/ingredient";

export default function TypeIngredient(props) {
  return (
    <>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{props.children}</h2>
      <ul className={`pl-4 pr-4 pt-6 pb-10 ${styles.list}`}>
        {props.data.map((item) => {
          return item['type'] === props.type && (
            <Ingredient url={item['image']} price={item['price']} name={item['name']} 
                        key={item['_id']}/>
          )
        })}
      </ul>
    </>
  )
}

TypeIngredient.propTypes = {
  children: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
}