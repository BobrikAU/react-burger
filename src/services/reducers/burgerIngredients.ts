import { UPDATE_INGREDIENTS } from '../actions/burgerIngredients';
import { TIgredient } from '../../utils/types';
import { TAllActions } from '../actions/unionOfActions';

export type TBurgerIngredientsState = null | Array<TIgredient>;

export const burgerIngredientsReducer = (state: TBurgerIngredientsState = null, 
  action: TAllActions): TBurgerIngredientsState => {
  switch (action.type) {
    case UPDATE_INGREDIENTS: 
      return action.ingredients;
    default:
      return state;
  }
};
