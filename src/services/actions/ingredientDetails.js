export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export function deleteIngrdientDetails(dispatch, stateIngredientDetails) {
  if (stateIngredientDetails) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS
    });
  }
}