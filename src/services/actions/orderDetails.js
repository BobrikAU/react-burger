import { baseUrl, checkResponse } from '../../utils/utils';
import { closeModal, schowError } from '../actions/app';

export const COUNT_PRICE_BURGER = 'COUNT_PRICE_BURGER';
export const SAVE_ORDER_DATA = 'SAVE_ORDER_DATA';

export function sendOrder(setRequest, constructorIngredients) {
  return function(dispatch) {
    setRequest({
      isActive: true,
      message: 'Отправляем заказ...'
    });
    const listIngredients = [...constructorIngredients.others];
    listIngredients.unshift(constructorIngredients.bun);
    listIngredients.push(constructorIngredients.bun);
    fetch(`${baseUrl}orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "ingredients": listIngredients
        })
      })
      .then(checkResponse)
      .then((data) => {
        dispatch({
                    type: SAVE_ORDER_DATA,
                    number: String(data.order.number),
                    execution: 'Ваш заказ начали готовить',
                  });
      })
      .catch((err) => {
        const message = `Оправка заказа была неудачной.${err} 
          Закройте окно и отправте заказ заново.`;
        closeModal();
        schowError(dispatch, message);
      })
      .finally(() => {
        setRequest({
          isActive: false,
          message: ''
        })
      })
  }
}