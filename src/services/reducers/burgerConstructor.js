import { ADD_BUN, 
         ADD_OTHER_INGREDIENT, 
         DELETE_OTHER_INGREDIENT, 
         MOVING_INGREDIENT } from '../actions/burgerConstructor';

const initialState = {
  bun: '',
  others: [],
}
export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVING_INGREDIENT:
      const [movedIngredient] = [...state.others.splice(action.indexOfMoved, 1)];
      state.others.splice(action.indexOfRecipient, 0, movedIngredient);
      return {
        ...state,
        others: [...state.others]
      };
    case DELETE_OTHER_INGREDIENT:
      state.others.splice(action.index, 1);
      return {
        ...state,
        others: [...state.others],
      };
    case ADD_OTHER_INGREDIENT:
      state.others.push(action.id);
      return {
        ...state,
        others: [...state.others],
      }
    case ADD_BUN:
      return {
        ...state,
        bun: action.id
      };
    default:
      return state;
  }
};
