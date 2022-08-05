import { deleteIngrdientDetails } from './ingredientDetails';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function schowError(dispatch, err) {
  dispatch({
    type: OPEN_MODAL,
    isModalActive: 'error',
    errorMessage: `Произошла ошибка.${err} Перезагрузите страницу.`
  })
}

export function closeModal(stateIngredientDetails) {
  return function(dispatch) {
    dispatch({
      type: CLOSE_MODAL,
    });
    deleteIngrdientDetails(dispatch, stateIngredientDetails);
  }
}