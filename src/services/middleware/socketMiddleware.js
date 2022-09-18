import {  WS_CONNECTION_START,
          WS_CONNECTION_SUCCESS, 
          WS_CONNECTION_CLOSED, 
          WS_CONNECTION_BREAK, 
          WS_CONNECTION_ERROR } from '../actions/socketMiddleware';
import { SAVE_ALL_ORDERS } from '../actions/orders';

export const socketMiddleware = store => next => action => {
  const actionType = action.type;
  const wsUrl = action.payload && action.payload.wsUrl;
  const { dispatch } = store;
  let socket;
  if ( actionType === WS_CONNECTION_START && wsUrl) {
    socket = new WebSocket(wsUrl);
    dispatch({type: WS_CONNECTION_START});
  }
  if ( actionType === WS_CONNECTION_BREAK) {
    const socket = store.getState().wsConnect.socket;
    socket && socket.close(1000, 'The page is closed');
  }
  if (socket) {
    socket.onopen = (e) => {
      console.log('onopen', e);
      dispatch({ type: WS_CONNECTION_SUCCESS, socket: e.currentTarget});
    };
    socket.onclose = (e) => {
      console.log('onclose', e);
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
    socket.onmessage = (e) => {
      console.log('onmessage', e.data);
      const data = JSON.parse(e.data);
      const url = e.currentTarget.url;
      if (url.indexOf('orders/all') > 0) {
        dispatch({ type: SAVE_ALL_ORDERS, allOrders: data})
      } else if (url.indexOf('orders?token') > 0) {
        dispatch({ type: SAVE_ALL_ORDERS, userOrders: data.orders})
      }
    };
    socket.onerror = (e) => {
      console.log('onerror', e);
      dispatch({type: WS_CONNECTION_ERROR, payload: e})
    }
  }
  return next(action);
}
