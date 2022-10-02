import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import Modal from '../components/modal/modal';
import { closeModal, changeActivePageActionCreator } from '../services/actions/app';
import OrderDetails from '../components/orderDetails/orderDetails';
import ErrorMessage from '../components/errorMassege/errorMassege';
import styles from './constructor.module.css';

export default function Constructor() {
  const dispatch = useDispatch();

  const { ingredients, isModalActive, message } = useSelector(state => ({
    ingredients: state.burgerIngredients,
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));

  useEffect( () => {
    dispatch(changeActivePageActionCreator('constructor'));
  } , [dispatch]);

  const closeModalWithDispatch = (saveBurger) => dispatch(closeModal(isModalActive, 
                                                                     saveBurger));
  
  return(
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        {ingredients && (<BurgerConstructor/>)}
      </DndProvider>
      {isModalActive !== '' && (
        <Modal closeModalWithDispatch={closeModalWithDispatch} activeModal={isModalActive}>
          {isModalActive === 'orderDetails' && 
            ( <OrderDetails closeModalWithDispatch={closeModalWithDispatch}/> )}
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </main>
  );
}