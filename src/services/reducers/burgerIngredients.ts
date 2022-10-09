import { UPDATE_INGREDIENTS } from '../actions/burgerIngredients';
import { TIgredient } from '../../utils/types';
import { TAllActions } from '../actions/unionOfActions';

export type TInitialState = null | Array<TIgredient>;

export const burgerIngredientsReducer = (state: TInitialState = null, 
  action: TAllActions): TInitialState => {
  switch (action.type) {
    case UPDATE_INGREDIENTS: 
      return action.ingredients;
    default:
      return state;
  }
};
