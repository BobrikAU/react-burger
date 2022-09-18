import { SAVE_ALL_ORDERS, ERASE_USER_ORDERS } from '../actions/orders';

const initialState = {
  allOrders: {},
  userOrders: [],
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_ORDERS:
      if (action.allOrders) {
        return {...state, allOrders: action.allOrders}
      }
      if (action.userOrders) {
        return {...state, userOrders: action.userOrders}
      }
      break;
    case ERASE_USER_ORDERS:
      return {...state, userOrders: []};
    default:
      return state;
  }
}