import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, 
         EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './registration.module.css';
import './globalSelectorsForms.css';
import { requestAboutUser } from '../services/actions/user';
import Modal from '../components/modal/modal';
import { openModalActionCreator, closeModal } from '../services/actions/app';
import ErrorMessage from '../components/errorMassege/errorMassege';

function Registration() {
  const dispatch = useDispatch();
  const { isModalActive, message } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));
  const history = useHistory();
  const location = useLocation();

  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  //функциональность поля name
  const [ nameValue, setNameValue ] = useState('');
  const [ errorName, setErrorName ] = useState(false);
  const refName = useRef();
  const onChangeName = (e) => {
    const text = e.target.value;
    setNameValue(text);
  };
  const onBlurName = () => {
    if (nameValue.length === 1) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };
  const onFocusName = () => {
    setErrorName(false);
  }

  //функциональность поля email
  const [ emailValue, setEmailValue ] = useState('');
  const [ errorEmailValue, setErrorEmailValue ] = useState(false);
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const isErrorEmailValue = (divEmail) => {
    setTimeout( () => {
      if (divEmail.classList.contains("input_status_error")) {
        setErrorEmailValue(true);
      } else {
        setErrorEmailValue(false);
      }
    }, 100);
  }

  //функциональность поля password
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ errorPasswordValue, setErrorPasswordValue ] = useState(false);
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const isErrorPasswordValue = (divPassword) => {
    setTimeout( () => {
      if (divPassword.classList.contains("input_status_error")) {
        setErrorPasswordValue(true);
      } else {
        setErrorPasswordValue(false);
      }
    }, 100);
  };

  //блокировка кнопки отправки формы при некорректности заполнения полей формы
  const [isButtonDisabled, setIsButtonDisabled ] = useState({ disabled: true });
  useEffect(() => {
    if (nameValue && !errorName && emailValue && !errorEmailValue && 
      passwordValue && !errorPasswordValue) {
      setIsButtonDisabled({});
    } else {
      setIsButtonDisabled({ disabled: true })
    }
  }, [nameValue, errorName, emailValue, passwordValue, errorEmailValue, 
      errorPasswordValue]
  );

  //отправка формы
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });
  const submit = (e) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Осуществляется регистрация...'));
    dispatch(requestAboutUser({
      requestOptions: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { 
            "name": nameValue, 
            "email": emailValue, 
            "password": passwordValue,
          }
        ),
      },
      endpointUrl: 'auth/register',
      setIsRequestSuccessful}));
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      closeModalWithDispatch();
      if (location.state) {
        history.replace({pathname: location.state.from});
      }
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

  useEffect(() => {
    const form = document.forms.registration;
    const inputEmail = form.elements.email;
    const inputPassword = form.elements.password;
    const divEmail = form.querySelector('.input_type_email');
    const divPassword = form.querySelector('.input_type_password');
    inputEmail.addEventListener('blur', (() => {isErrorEmailValue(divEmail)}));
    inputEmail.addEventListener('focus', (() => {setErrorEmailValue(false)}));
    inputPassword.addEventListener('blur', (() => {isErrorPasswordValue(divPassword)}));
    inputPassword.addEventListener('focus', (() => {setErrorPasswordValue(false)}));
    return () => {
      inputEmail.removeEventListener('blur', 
        (() => {isErrorEmailValue(divEmail)}));
      inputEmail.removeEventListener('focus', (() => {setErrorEmailValue(false)}));
      inputPassword.removeEventListener('blur', 
        (() => {isErrorPasswordValue(divPassword)}));
      inputPassword.removeEventListener('focus', (() => {setErrorPasswordValue(false)}));
    }
  }, []);

  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form name='registration' id='form' className={`mb-20 ${styles.form}`}>
        <Input 
          type='text' 
          placeholder='Имя' 
          size='default' 
          value={nameValue} 
          name='name' 
          ref={refName} 
          onChange={onChangeName}
          onBlur={onBlurName} 
          onFocus={onFocusName} 
          error={errorName}
          errorText='В имени должно быть больше одного символа'
        />
        <EmailInput
          name='email' 
          value={emailValue}
          onChange={onChangeEmail}
        />
        <PasswordInput
          value={passwordValue} 
          name='password' 
          onChange={onChangePassword}
        />
        <Button 
          type='primary' 
          size='medium' 
          id='buttonRegister' 
          onClick={submit} 
          name='button'          
          {...isButtonDisabled}>
          Зарегистрироваться
        </Button> 
      </form>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Link 
          to={
              location.state ? 
              {pathname: '/login', state: {...location.state}} : 
              '/login'
             }
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
      {isModalActive !== '' && (
        <Modal closeModalWithDispatch={closeModalWithDispatch} 
          activeModal={isModalActive}>
          {isModalActive === 'error' && (<ErrorMessage message={message}/>)}
        </Modal>
      )}
    </main>
  )
}

export default Registration;