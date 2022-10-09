import { IChangeActivePageAction, IOpenModalAction, ICloseModalAction } from './app';
import {  IResetConstructorAction,
          IAddBunAction,
          IAddOtherIngredientAction,
          IMovingIngredientAction,
          IDeleteIngredientAction } from './burgerConstructor';
import { IUpdateIngredientsAction } from './burgerIngredients';
import { IDeleteIngrdientDetailsAction } from './ingredientDetails';
import {  ISaveOrderDataAction,
          ICountPriceBurgerAction } from './orderDetails';
import {  ISocketStartFeedAndHistoryActions, 
          ICloseWsConnectionAction } from './socketMiddleware';
import { ISaveOrEraseUserAction } from './user';

export type TAllActions = 
  | IChangeActivePageAction
  | IOpenModalAction
  | ICloseModalAction
  | IResetConstructorAction
  | IAddBunAction
  | IAddOtherIngredientAction
  | IMovingIngredientAction
  | IDeleteIngredientAction
  | IUpdateIngredientsAction
  | IDeleteIngrdientDetailsAction
  | ISaveOrderDataAction
  | ICountPriceBurgerAction
  | ISocketStartFeedAndHistoryActions
  | ICloseWsConnectionAction
  | ISaveOrEraseUserAction
