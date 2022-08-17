import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';
import { appReducer } from './app';

export const rootReducer = combineReducers({
    app: appReducer,
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
});
