import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';

class App extends React.Component {
  state = {active: 'constructor'}

  render() {
    return (
      <div className={styles.app}>
        <AppHeader active={this.state.active}/>
        <main className={styles.main}>
          <BurgerIngredients />
        </main>
      </div>
    );
  }
}

export default App;
