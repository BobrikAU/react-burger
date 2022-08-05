import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/appContext';
import { ADD_FIRST_LISTE } from '../../services/actions/burgerConstructor';

let todoCounter = 0;
function getNewTodo() {
  todoCounter += 1;
}

function BurgerConstructor({openModal}) {
  
  const ingredients = useSelector(state => state.burgerIngredients);
  const dispatch = useDispatch();
  useEffect ( () => {
    dispatch({
      type: ADD_FIRST_LISTE
    });
  }, [])
  const {bun111, others111} = useSelector( state => ({
    bun111: state.burgerConstructor.bun,
    others111: state.burgerConstructor.others,
  }));





  const [stateOrder, dispatchOrder] = useContext(OrderContext);

  const openModalOrderDetails = () => {
    openModal('orderDetails');
  }
  
  const bun = React.useMemo( () => {
    return ingredients.find(item => {
      return item._id === bun111;
    });
  },[bun111]);
  
  const othersIngredients = React.useMemo( () => {
    return others111.map((item) => {
      return ingredients.find( meal => {
        return meal._id === item;
      });
    });
  }, [others111]);
  
  useEffect(() => {
      dispatchOrder({
      type: "countPrice",
      bun,
      othersIngredients
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
          <p className="text text_type_digits-medium mr-2">{stateOrder.price}</p>
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