import { deleteIngrdientDetails } from './ingredientDetails';
import { resetConstructorActionCreator } from './burgerConstructor';

export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export const CHANGE_ACTIVE_PAGE: 'CHANGE_ACTIVE_PAGE' = 'CHANGE_ACTIVE_PAGE';

interface IChangeActivePageAction {
  type: 'CHANGE_ACTIVE_PAGE';
  activePage: string;
}
export function changeActivePageActionCreator(page: string): IChangeActivePageAction {
  return {
    type: CHANGE_ACTIVE_PAGE,
    activePage: page
  }
}

interface IOpenModalAction {
  type: 'OPEN_MODAL';
  isModalActive: string;
  message: string;
}
export function openModalActionCreator(typeModal: string, message: string = ''): 
  IOpenModalAction {
  return {
    type: OPEN_MODAL,
    isModalActive: typeModal,
    message,
  }
}

export function closeModal(isModalActive: string, saveBurger: boolean) {
  return function(dispatch): void {
    dispatch({
      type: CLOSE_MODAL,
    });
    switch (isModalActive){
      case 'ingredientDetails':
        dispatch(deleteIngrdientDetails());
        break;
      case 'orderDetails':
        if (!saveBurger) {
          dispatch(resetConstructorActionCreator());
        }
        break;
      default:
        return;
    }
  }
};
