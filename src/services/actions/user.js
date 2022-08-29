import { baseUrl, checkResponse } from '../../utils/utils';
import { setCookie } from '../../utils/utils';

export const SAVE_USER = 'SAVE_USER';

/*function saveTokens({accessToken, refreshToken}) {
  const accessTokenWithoutText = accessToken.split('Bearer ')[1];
  setCookie('accessToken', accessTokenWithoutText);
  localStorage.setItem('refreshToken', refreshToken);
}

function sendRequest(bodyRequest, endpointUrl) {
  const request = new Promise(function(resolve, reject) {
    fetch(`${baseUrl}${endpointUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    })
    .then((res) => {
      return resolve(res);
    })
    .catch(err => reject(err))
  });
  return request;
}*/

export const eraseUserActionCreator = () => ({
  type: SAVE_USER,
  email: '',
  name: '',
});

const saveUserActionCreator = (data) => ({
  type: SAVE_USER,
  email: data.user.email,
  name: data.user.name,
});

export const requestAboutUser = ( bodyRequest, 
                                  endpointUrl, 
                                  setIsRequestSuccessful,
                                  options) => {
  return function(dispatch) {
    fetch(`${baseUrl}${endpointUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    })
    .then(checkResponse)
    .then(data => {
      if (data.user) {
        dispatch(saveUserActionCreator(data));
      }
      if (data.accessToken && data.refreshToken) {
        const accessTokenWithoutText = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', accessTokenWithoutText);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      //saveTokens(data);
      if (setIsRequestSuccessful) {
        setIsRequestSuccessful({value: true, message: ''});
      } else {
        options.resolve(data.accessToken);
      }
    })
    .catch((err) => {
      if (setIsRequestSuccessful) {
        setIsRequestSuccessful({
          value: false, 
          message: `${err}. Закоройте настоящее окно и попробуйте снова.`
        });
      } else {
        options.reject();
      }
    })
  }
};

/*export const updateToken = () => {
  return function() {
    const refreshToken = localStorage.getItem('refreshToken')
    fetch(`${baseUrl}auth/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "refreshToken": refreshToken
      })
      .then(checkResponse)
      .then(data => {
        saveTokens(data);
      })
      .catch(() => {
        alert('Ошибка при сохранении токенов');
      })
    })
  }
};

export const restoreAccount = ( bodyRequest, 
                                endpointUrl, 
                                setIsRequestSuccessful) => {
  return function(dispatch) {
    sendRequest(bodyRequest, endpointUrl)
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        setIsRequestSuccessful({value: true, message: ''});
      }
    })
    .catch((err) => {
      setIsRequestSuccessful({
        value: false, 
        message: `${err}. Закоройте настоящее окно и попробуйте снова.`
      });
    })
  }


  return function(dispatch) {
    fetch(`${baseUrl}${endpointUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    })
}*/

function requestUserData(accessToken) {
  return function(dispatch) {
    const request = new Promise ((resolve, reject) => {
      fetch(`${baseUrl}auth/user`, {
        headers: {
          "authorization": accessToken
        }
      })
      .then(checkResponse)
      .then(data => {
        dispatch(saveUserActionCreator(data));
        resolve();
      })
      .catch(() => {
        reject();
      });
    });
    return request;  
  }
}


export const getUser = (dispatch, accessToken, refreshToken, options) => {
    dispatch(requestUserData(accessToken))
      .catch( () => {
        new Promise((resolve, reject) => {
        dispatch(requestAboutUser(
          {
            'token': refreshToken
          },
          'auth/token',
          '',
          {resolve, reject}
        ))})
        .then((newAccessToken) => {
            dispatch(requestUserData(newAccessToken));
          }
        )
        .catch(() => options.reject());
      })
  };

