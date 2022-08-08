import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

  const { ingredients, isModalActive, message } = useSelector( state => ({
    ingredients: state.burgerIngredients,
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));

  useEffect( () => {
    dispatch(getIngredients())
  } , [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients/>
          {ingredients && (<BurgerConstructor/>)}
        </main>
      </DndProvider>
      {isModalActive !== '' && (
        <Modal activeModal={isModalActive}>
          {isModalActive === 'orderDetails' && ( <OrderDetails/> )}
          {isModalActive === 'ingredientDetails' && (<IngredientDetails/>)}
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </div>
  );
}

export default App;
