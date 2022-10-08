import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_OTHER_INGREDIENT: 'ADD_OTHER_INGREDIENT' = 'ADD_OTHER_INGREDIENT';
export const DELETE_OTHER_INGREDIENT: 'DELETE_OTHER_INGREDIENT' = 'DELETE_OTHER_INGREDIENT';
export const MOVING_INGREDIENT: 'MOVING_INGREDIENT' = 'MOVING_INGREDIENT';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

export const resetConstructorActionCreator = (): {type: 'RESET_CONSTRUCTOR'} => {
  return {
    type: RESET_CONSTRUCTOR,
  }
};

export interface IAddIngredientAction {
  type: 'ADD_BUN' | 'ADD_OTHER_INGREDIENT';
  id: string;
  uuid?: string;
}
interface IItem {
  _id: string;
  _type: string;
}
export const addIngredientActionCreator = (item: IItem): IAddIngredientAction => {
  if (item._type === 'bun') {
    return {
      type: ADD_BUN,
      id: item._id,
    }
  }
  return {
    type: ADD_OTHER_INGREDIENT,
    id: item._id,
    uuid: uuidv4(),
  }
};