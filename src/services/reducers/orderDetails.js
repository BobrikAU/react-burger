import { COUNT_PRICE_BURGER } from '../actions/orderDetails';

const initialState = {
  number: '',
  execution: '',
  price: 0
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_PRICE_BURGER:
      return {
        ...state,
        price: action.price,
      };
    default:
      return state;
  }
};
