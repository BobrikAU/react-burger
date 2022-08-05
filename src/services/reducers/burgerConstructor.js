import { ADD_FIRST_LISTE } from '../actions/burgerConstructor';

const initialState = {
  bun: '',
  others: [],
}
export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIRST_LISTE:
      return {
        bun: "60d3b41abdacab0026a733c6",
        others:
          [
            "60d3b41abdacab0026a733ce",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d0"
          ],
      }
    default:
      return state;
  }
};
