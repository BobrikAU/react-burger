import { useEffect } from 'react';
import { useSelector, useDispatch } from '../utils/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredientDetails/ingredientDetails';
import { getIngredients } from '../services/actions/burgerIngredients';
import Loader from '../images/loader.gif';
import styles from './detailsIngredient.module.css';

function DetailsIngredient() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.burgerIngredients);
  
  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
  }, []);
  

  const {_id} = useParams<{_id: string}>();
  let ingredient;
  if (ingredients) {
    ingredient = ingredients.find(item => {
      return _id === item._id
    });
  }
  
  return (
    <main className={`${styles.page} pt-30`}>
      {
        ingredient ? 
        (<IngredientDetails ingredient={ingredient}/>) :
        (<img src={Loader} alt='Загружаем...'/>)
      }
    </main>
  )
}

export default DetailsIngredient;