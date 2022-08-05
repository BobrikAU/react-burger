import { baseUrl, checkResponse } from '../../utils/utils';
import { schowError } from './app';

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
      schowError(dispatch, `Произошла ошибка.${err} Перезагрузите страницу.`);
    });
  }
}
