import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/appContext';
import { ADD_FIRST_LISTE } from '../../services/actions/burgerConstructor';
import { COUNT_PRICE_BURGER } from '../../services/actions/orderDetails';

let todoCounter = 0;
function getNewTodo() {
  todoCounter += 1;
}

function BurgerConstructor({openModal}) {
  
  const {ingredients, burgerPrice} = useSelector(state => ({
    ingredients: state.burgerIngredients,
    burgerPrice: state.orderDetails.price,
  }));
  const dispatch = useDispatch();
  useEffect ( () => {
    dispatch({
      type: ADD_FIRST_LISTE
    });
  }, [])
  const {bunId, othersId} = useSelector( state => ({
    bunId: state.burgerConstructor.bun,
    othersId: state.burgerConstructor.others,
  }));





  //const [stateOrder, dispatchOrder] = useContext(OrderContext);

  const openModalOrderDetails = () => {
    openModal('orderDetails');
  }
  
  const bun = React.useMemo( () => {
    return ingredients.find(item => {
      return item._id === bunId;
    });
  },[bunId]);
  
  const othersIngredients = React.useMemo( () => {
    return othersId.map((item) => {
      return ingredients.find( meal => {
        return meal._id === item;
      });
    });
  }, [othersId]);
  
  useEffect(() => {
    const bunPrice = bun === undefined ? 0 : bun.price;
    const burgerPrice = bunPrice * 2 + othersIngredients.reduce( (previousValue, item) => {
        return previousValue + item.price;
      }, 0);
    dispatch({
      type: COUNT_PRICE_BURGER,
      price: burgerPrice,
    })
  }, [bun, othersIngredients])

  return (
    <section className={`pl-4 pt-25 pb-3 ${styles.order}`}>
      <ul className={styles.orderStructure}>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="top" isLocked={true} text={`${bun.name} 
          (верх)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
        <ul className={`${othersIngredients.length !== 0 && "mt-4 mb-4 pr-4"} 
        ${styles.othersIngredients}`}>
          {othersIngredients.map((item) => {
            getNewTodo();
            return (<li className={`pl-4 ${styles.otherIngredient}`} key={todoCounter}>
                      <DragIcon type="primary" />
                      <ConstructorElement text={item.name} thumbnail={item.image} 
                      price={item.price}/>
                    </li>)
          })}
        </ul>
        <li className={`${styles.bun} pr-4`}>
          {bun && (<ConstructorElement type="bottom" isLocked={true} text={`${bun.name} 
          (низ)`} thumbnail={bun.image} price={bun.price}/>)}
        </li>
      </ul>
      <div className={`mt-10 mb-10 ${styles.finishOrder} pr-4`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{burgerPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModalOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;