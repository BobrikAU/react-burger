import { baseUrl, checkResponse } from '../../utils/utils';
import { openModalActionCreator } from './app';
import { v4 as uuidv4 } from 'uuid';
import { TIgredient } from '../../utils/types';

export const UPDATE_INGREDIENTS: 'UPDATE_INGREDIENTS' = 'UPDATE_INGREDIENTS';

export interface IUpdateIngredientsAction {
  readonly type: 'UPDATE_INGREDIENTS';
  readonly ingredients: Array<TIgredient>;
}
const updateIngredientsActionCreator = (data: Array<Omit<TIgredient, 'uuid'> & 
  {uuid: string;}>) => {
  return function(dispatch) {
    data.forEach(ingredient => {
      ingredient.uuid = uuidv4();
    });
    const updateIngredientAction: IUpdateIngredientsAction = {
      type: UPDATE_INGREDIENTS,
      ingredients: data
    };
    dispatch(updateIngredientAction);
  }
};

export function getIngredients() {
  return function (dispatch): void {
    fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then( (data: {succses: Boolean, data: Array<TIgredient>}) => {
      dispatch(updateIngredientsActionCreator(data.data));
    })
    .catch((err: string) => {
      const message = `Произошла ошибка.${err} Перезагрузите страницу.`;
      dispatch(openModalActionCreator('error', message));
    });
  }
}
