import { OPEN_MODAL } from '../actions/app';

const initialState = {
  activePage: 'constructor',
  isModalActive: {
    isModalActive: '',
    errorMessage: ''
  }
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isModalActive: {
          isModalActive: action.isModalActive,
          errorMessage: action.errorMessage ? action.errorMessage : '',
        }
      }
    default:
      return state;
  }
};
