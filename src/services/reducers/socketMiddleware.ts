import {  WS_CONNECTION_START, 
          WS_CONNECTION_SUCCESS,
          WS_CONNECTION_CLOSED, 
          WS_CONNECTION_ERROR } from '../actions/socketMiddleware';
import { TAllActions } from '../actions/unionOfActions';

interface ISocketMiddlewareState {
  wsStatus: string;
  socket: EventTarget | null;
  error: Event | null;
}
const initialState = {
  wsStatus: 'disconnect',
  socket: null,
  error: null
};

export const socketMiddlewareReducer = (state = initialState, action: TAllActions)
  : ISocketMiddlewareState => {
  switch (action.type) {
    case WS_CONNECTION_CLOSED:
      return {...state, wsStatus: 'disconnect', socket: null}
    case WS_CONNECTION_START:
      return {...state, wsStatus: 'connecting', error: null};
    case WS_CONNECTION_SUCCESS:
      return {...state, wsStatus: 'connect', socket: action.socket};
    case WS_CONNECTION_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};
