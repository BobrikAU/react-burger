import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import {urlGetIngredients} from '../../utils/utils';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import ErrorMessage from '../errorMassege/errorMassege';


function App() {
  
  const [activePage, setActivePage] = useState('constructor');
  const [order, setOrder] = useState({
                                      number: '034536',
                                      execution: 'Ваш заказ начали готовить',
                                      bun: "60d3b41abdacab0026a733c6",
                                      others: ["60d3b41abdacab0026a733ce", 
                                               "60d3b41abdacab0026a733c9",
                                               "60d3b41abdacab0026a733d1",
                                               "60d3b41abdacab0026a733d0",
                                               "60d3b41abdacab0026a733d0"
                                              ]
                                     });
  const [ingredients, setIngredients] = useState(null);
  const [isModalActive, setIsModalActive] = useState({
                                                        isModalActive: false,
                                                        orderDetails: false,
                                                        ingredientDetails: false,
                                                        shownIngredient: {},
                                                        isError: false,
                                                        errorMessage: ''
                                                      });

  const closeModal = () => {
    setIsModalActive({
                      isModalActive: false,
                      orderDetails: false,
                      ingredientDetails: false,
                      shownIngredient: {},
                      isError: false,
                      errorMessage: ''
                      });
  }

  const openModal = (modalWindow: string, shownIngredient = {}) => {
    setIsModalActive({
                      ...isModalActive,
                      isModalActive: true,
                      [modalWindow]: true,
                      shownIngredient
                      });
  }

  useEffect( () => {
    const getIngredients = () => {
      fetch(urlGetIngredients)
        .then( res => {
          if (!res.ok) {
            return Promise.reject(` Запрос списка ингредиентов был неудачным. Код ошибки: ${res.status}.`);
          }
          return res.json();
        })
        .then( data => {
          setIngredients(data.data);
        })
        .catch((err) => {
          setIsModalActive({
            ...isModalActive,
            isModalActive: true,
            isError: true,
            errorMessage: `Произошла ошибка.${err} Перезагрузите страницу.`
          })
        });};
    getIngredients();
  } , [])

  return (
    <div className={styles.app}>
      <AppHeader activePage={activePage}/>
      <main className={styles.main}>
        <BurgerIngredients order={order} ingredients={ingredients} openModal={openModal}/>
        {ingredients && (<BurgerConstructor bunOrder={order.bun} othersOrder={order.others} ingredients={ingredients} openModal={openModal}/>)}
      </main>
      {isModalActive.isModalActive && (
        <Modal closeModal={closeModal} orderDetails={isModalActive.orderDetails} ingredientDetails={isModalActive.ingredientDetails}>
          {isModalActive.orderDetails && (<OrderDetails numberOrder={order.number} orderExecution={order.execution}/>)}
          {isModalActive.ingredientDetails && (<IngredientDetails ingerdient={isModalActive.shownIngredient}/>)}
          {isModalActive.isError && (<ErrorMessage errorMessage={isModalActive.errorMessage}/>)}
        </Modal>
      )}
    </div>
  );
}

export default App;
