import { baseUrl, checkResponse } from '../../utils/utils';
import { setCookie } from '../../utils/utils';

export const SAVE_USER = 'SAVE_USER';

export const registerNewUser = (name, email, password, setIsRequestSuccessful) => {
  return function(dispatch) {
    fetch(`${baseUrl}auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
      })
    })
    .then(checkResponse)
    .then(data => {
      dispatch({
        type: SAVE_USER,
        email: data.user.email,
        name: data.user.name,
      });
      const accessToken = data.accessToken.split('Bearer ')[1];
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsRequestSuccessful({value: true, message: ''});
    })
    .catch((err) => {
      setIsRequestSuccessful({
        value: false, 
        message: `${err}. Закоройте настоящее окно и попробуйте снова.`
      });
    })
  }
};