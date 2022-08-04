import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import ErrorMessage from '../errorMassege/errorMassege';
import { OrderContext } from '../../services/appContext';
import { getIngredients } from '../../services/actions/burgerIngredients';


const App = () => {
  
  const dispatch = useDispatch();

  const ingredients = useSelector( state => state.burgerIngredients)







  const [isModalActive, setIsModalActive] = useState({
                                                        isModalActive: '',
                                                        shownIngredient: {},
                                                        errorMessage: ''
                                                      });

  const closeModal = () => {
    setIsModalActive({
                      isModalActive: '',
                      shownIngredient: {},
                      errorMessage: ''
                      });
  }

  const openModal = (modalWindow, shownIngredient = {}) => {
    setIsModalActive({
                      ...isModalActive,
                      isModalActive: modalWindow,
                      shownIngredient
                      });
  }

  const initialOrder = {
                          number: '',
                          execution: '',
                          bun: '',
                          others:[],
                          price: 0
                        };
  const initOrder = (initialOrder) => {return {
                                                ...initialOrder,
                                                execution: 'Ваш заказ начали готовить',
                                                bun: "60d3b41abdacab0026a733c6",
                                                others: ["60d3b41abdacab0026a733ce", 
                                                         "60d3b41abdacab0026a733c9",
                                                         "60d3b41abdacab0026a733d1",
                                                         "60d3b41abdacab0026a733d0",
                                                         "60d3b41abdacab0026a733d0"
                                                       ]
                                              }};
  const reducerOrder = (stateOrder, actionOrder) => {
    function countPrice({bun, othersIngredients}) {
      const bunPrice = bun === undefined ? 0 : bun.price;
      return bunPrice * 2 + othersIngredients.reduce( (previousValue, item) => {
          return previousValue + item.price;
        }, 0);
    }
    switch (actionOrder.type) {
      case "countPrice":
        return {
                 ...stateOrder,
                 price: countPrice(actionOrder)
               };
      case 'saveNumberOrder':
        return {
                 ...stateOrder,
                 number: actionOrder.number
               };
      default:
    }
  };
  const [stateOrder, dispatchOrder] = useReducer(reducerOrder, initialOrder, initOrder);
  
  useEffect( () => {
    dispatch(getIngredients())
  } , []);

  return (
    <div className={styles.app}>
      <AppHeader/>
      <OrderContext.Provider value={[stateOrder, dispatchOrder]}>
        <main className={styles.main}>
          <BurgerIngredients openModal={openModal}/>
          {ingredients && (<BurgerConstructor openModal={openModal}/>)}
        </main>
        {isModalActive.isModalActive !== '' && (
          <Modal closeModal={closeModal} activeModal={isModalActive.isModalActive}>
            {isModalActive.isModalActive === 'orderDetails' && (
              <OrderDetails/>
            )}
            {isModalActive.isModalActive === 'ingredientDetails' && (<IngredientDetails 
            ingerdient={isModalActive.shownIngredient}/>)}
            {isModalActive.isModalActive === 'error' && (<ErrorMessage 
            errorMessage={isModalActive.errorMessage}/>)}
          </Modal>
        )}
      </OrderContext.Provider>
    </div>
  );
}

export default App;
