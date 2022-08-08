import { baseUrl, checkResponse } from '../../utils/utils';
import { openModalActionCreator } from './app';

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';

export function getIngredients() {
  return function (dispatch) {
    fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then( data => {
      dispatch({
        type: UPDATE_INGREDIENTS,
        ingredients: data.data
      });
    })
    .catch((err) => {
      const message = `Произошла ошибка.${err} Перезагрузите страницу.`;
      dispatch(openModalActionCreator('error', message));
    });
  }
}
