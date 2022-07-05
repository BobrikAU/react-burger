import React, {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import {urlGetIngredients} from '../../utils/utils';

function App() {
  
  const [activePage, setActivePage] = useState('constructor');
  const [order, setOrder] = useState({
                                       bun: "60d3b41abdacab0026a733c6",
                                       others: ["60d3b41abdacab0026a733ce", 
                                                "60d3b41abdacab0026a733c9",
                                                "60d3b41abdacab0026a733d1",
                                                "60d3b41abdacab0026a733d0",
                                                "60d3b41abdacab0026a733d0"
                                               ]
                                     });
  const [ingredients, setIngredients] = useState(null);

  useEffect( () => {
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
        alert(`Произошла ошибка.${err} Перезагрузите страницу.`);
      })
  } , [])

  return (
    <div className={styles.app}>
      <AppHeader activePage={activePage}/>
      <main className={styles.main}>
        <BurgerIngredients order={order} ingredients={ingredients}/>
        {ingredients && (<BurgerConstructor order={order} ingredients={ingredients}/>)}
      </main>
    </div>
  );
}

export default App;
