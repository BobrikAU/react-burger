import React from "react";
import styles from './ingredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ingerdient}) {

  const {image_large, name, calories, proteins, fat, carbohydrates} = ingerdient;

  return(
    <>
      <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
      <img src={image_large} alt={`Изображение ${name}`}/>
      <p className={`text text_type_main-medium mt-4`}>{name}</p>
      <ul className={`${styles.foodValue} mt-8`}>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </li>
        <li className={styles.component}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}

IngredientDetails.propTypes = {

}

export default IngredientDetails;