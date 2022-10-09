import { IChangeActivePageAction, IOpenModalAction, ICloseModalAction } from './app';
import { IResetConstructorAction, IAddIngredientAction } from './burgerConstructor';
import { IUpdateIngredientsAction } from './burgerIngredients';
import { IDeleteIngrdientDetailsAction } from './ingredientDetails';
import { ISaveOrderDataAction } from './orderDetails';
import { ISocketStartFeedAndHistoryActions, 
         ICloseWsConnectionAction } from './socketMiddleware';
import { ISaveOrEraseUserAction } from './user';

export type AllActions = 
  | IChangeActivePageAction
  | IOpenModalAction
  | ICloseModalAction
  | IResetConstructorAction
  | IAddIngredientAction
  | IUpdateIngredientsAction
  | IDeleteIngrdientDetailsAction
  | ISaveOrderDataAction
  | ISocketStartFeedAndHistoryActions
  | ICloseWsConnectionAction
  | ISaveOrEraseUserAction
