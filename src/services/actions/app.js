export const OPEN_MODAL = 'OPEN_MODAL';

export function openModal(dispatch, err) {
  dispatch({
    type: OPEN_MODAL,
    isModalActive: 'error',
    errorMessage: `Произошла ошибка.${err} Перезагрузите страницу.`
  })
}