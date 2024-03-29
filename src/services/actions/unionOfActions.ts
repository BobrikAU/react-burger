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
          IBreakWsConnectionAction, 
          ICloseWsConnectionAction,
          IOpenWsConnectionAction, 
          IErrorWsConnectionAction } from './socketMiddleware';
import { ISaveOrEraseUserAction } from './user';
import { ISaveAllOrdersAction, IEraseUserOrdersAction } from './orders';

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
  | IBreakWsConnectionAction
  | ICloseWsConnectionAction
  | IOpenWsConnectionAction
  | IErrorWsConnectionAction
  | ISaveOrEraseUserAction
  | ISaveAllOrdersAction
  | IEraseUserOrdersAction
