import React from "react";
import styles from './ingredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ingerdient}) {

  const {image_large, name, calories, proteins, fat, carbohydrates} = ingerdient;

  return(
    <>
      <h2 className={`text text_type_main-large ${styles.title} mt-3`}>Детали ингредиента</h2>
      <img src={image_large} alt={`Изображение ${name}`} className={`${styles.image} mt-3`}/>
      <p className={`text text_type_main-medium mt-4`}>{name}</p>
      <ul className={`${styles.foodValue} mt-8`}>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </li>
        <li className={`${styles.component} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </li>
        <li className={styles.component}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}

IngredientDetails.propTypes = {
  ingerdient: PropTypes.shape({
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
  })
}

export default IngredientDetails;