import { deleteIngrdientDetails } from './ingredientDetails';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function schowError(dispatch, errorMessage) {
  dispatch({
    type: OPEN_MODAL,
    isModalActive: 'error',
    errorMessage,
  })
}

export function closeModal(stateIngredientDetails = null) {
  return function(dispatch) {
    dispatch({
      type: CLOSE_MODAL,
    });
    deleteIngrdientDetails(dispatch, stateIngredientDetails);
  }
}