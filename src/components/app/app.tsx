import React, {useState} from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

function App() {
  
  const [activePage, setActivePage] = useState('constructor');
  const [order, setOrder] = useState({
                                       bun: "60666c42cc7b410027a1a9b1",
                                       others: ["60666c42cc7b410027a1a9b9", 
                                                "60666c42cc7b410027a1a9b4",
                                                "60666c42cc7b410027a1a9bc",
                                                "60666c42cc7b410027a1a9bb",
                                                "60666c42cc7b410027a1a9bb"
                                               ]
                                     });

  return (
    <div className={styles.app}>
      <AppHeader activePage={activePage}/>
      <main className={styles.main}>
        <BurgerIngredients order={order}/>
        <BurgerConstructor order={order}/>
      </main>
    </div>
  );
}

export default App;
