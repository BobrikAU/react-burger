import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import ErrorMessage from '../errorMassege/errorMassege';
import { getIngredients } from '../../services/actions/burgerIngredients';


const App = () => {
  
  const dispatch = useDispatch();

  const { ingredients, isModalActive, errorMessage } = useSelector( state => ({
    ingredients: state.burgerIngredients,
    isModalActive: state.app.isModalActive.isModalActive,
    errorMessage: state.app.isModalActive.errorMessage,
  }));

  useEffect( () => {
    dispatch(getIngredients())
  } , [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients/>
        {ingredients && (<BurgerConstructor/>)}
      </main>
      {isModalActive !== '' && (
        <Modal activeModal={isModalActive}>
          {isModalActive === 'orderDetails' && ( <OrderDetails/> )}
          {isModalActive === 'ingredientDetails' && (<IngredientDetails/>)}
          {isModalActive === 'error' && (<ErrorMessage errorMessage={errorMessage}/>)}
        </Modal>
      )}
    </div>
  );
}

export default App;
