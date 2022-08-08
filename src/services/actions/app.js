import { deleteIngrdientDetails } from './ingredientDetails';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModalActionCreator(typeModal, message = '') {
  return {
    type: OPEN_MODAL,
    isModalActive: typeModal,
    message,
  }
}

export function closeModal(isModalActive) {
  return function(dispatch) {
    dispatch({
      type: CLOSE_MODAL,
    });
    if (isModalActive === 'ingredientDetails') {
      dispatch(deleteIngrdientDetails());
    }
  }
}
