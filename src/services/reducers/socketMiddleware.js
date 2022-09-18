import {  WS_CONNECTION_START, 
          WS_CONNECTION_SUCCESS,
          WS_CONNECTION_CLOSED } from '../actions/socketMiddleware';

const initialState = {
  wsStatus: 'disconnect',
  socket: null,
};

export const socketMiddlewareReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return {wsStatus: 'disconnect', socket: null}
    case WS_CONNECTION_START:
      return {...state, wsStatus: 'connecting'};
    case WS_CONNECTION_SUCCESS:
      return {wsStatus: 'connect', socket: action.socket};
    default:
      return state;
  }
};
