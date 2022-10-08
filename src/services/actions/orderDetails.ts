import { baseUrl, checkResponse } from '../../utils/utils';
import { closeModal, openModalActionCreator } from './app';
import { TIgredient } from '../../utils/types';

export const COUNT_PRICE_BURGER: 'COUNT_PRICE_BURGER' = 'COUNT_PRICE_BURGER';
export const SAVE_ORDER_DATA: 'SAVE_ORDER_DATA' = 'SAVE_ORDER_DATA';

interface IConstructorIngredients {
  bun: string;
  others: {id: string, uuid: string}[];
}
type TSetRequest = React.Dispatch<React.SetStateAction<{
  isActive: boolean;
  message: string;
}>>;
interface ISendOrderResponseData {
  name: string;
  succes: boolean;
  order: {
    createdAt: string;
    ingredients: Array<Omit<TIgredient, 'uuid'>>;
    name: string;
    number: number;
    owner: {
      [name: string]: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
  }
}
export function sendOrder(setRequest: TSetRequest, 
                          constructorIngredients: IConstructorIngredients, 
                          accessToken: string) {
  return function(dispatch) {
    setRequest({
      isActive: true,
      message: 'Отправляем заказ...'
    });
    const listIngredients = constructorIngredients.others.map((item) => item.id);
    listIngredients.unshift(constructorIngredients.bun);
    listIngredients.push(constructorIngredients.bun);
    fetch(`${baseUrl}orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "authorization": accessToken,
        },
        body: JSON.stringify({
          "ingredients": listIngredients
        })
      })
      .then(checkResponse)
      .then((data: ISendOrderResponseData) => {
        dispatch({
                    type: SAVE_ORDER_DATA,
                    number: String(data.order.number),
                    execution: 'Ваш заказ начали готовить',
                  });
      })
      .catch((err: string) => {
        const message = `Оправка заказа была неудачной.${err} 
          Закройте окно и отправте заказ заново.`;
        closeModal('orderDetails', true);
        dispatch(openModalActionCreator('error', message));
      })
      .finally(() => {
        setRequest({
          isActive: false,
          message: ''
        })
      })
  }
}