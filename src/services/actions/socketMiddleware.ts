import { wsBaseUrl, getCookie } from '../../utils/utils';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_BREAK: 'WS_CONNECTION_BREAK' = 'WS_CONNECTION_BREAK';

export interface ISocketStartFeedAndHistoryActions {
  type: 'WS_CONNECTION_START';
  payload: {[name: string]: string}
}
export function socketStartFeedActionCreator (): ISocketStartFeedAndHistoryActions {
  return {
    type: WS_CONNECTION_START,
    payload: {wsUrl: `${wsBaseUrl}/all`, fieldName: 'allOrders'}
  }
}

export interface ICloseWsConnectionAction {
  type: 'WS_CONNECTION_BREAK';
}
export function closeWsConnectionActionCreator (): ICloseWsConnectionAction {
  return {
    type: WS_CONNECTION_BREAK
  }
}

export function socketStartHistoryActionCreator (): ISocketStartFeedAndHistoryActions {
  const accessToken = getCookie('accessToken');
  return {
    type: WS_CONNECTION_START,
    payload: {wsUrl: `${wsBaseUrl}?token=${accessToken}`, fieldName: 'userOrders'}
  }
}
