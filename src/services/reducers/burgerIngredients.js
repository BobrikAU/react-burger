import { UPDATE_INGREDIENTS } from '../actions/burgerIngredients';

export const burgerIngredientsReducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_INGREDIENTS: 
      return action.ingredients;
    default:
      return state;
  }
};
