import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Input, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
         import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from './resetPassword.module.css';
import './globalSelectorsForms.css';
import { closeModal, openModalActionCreator } from '../services/actions/app';
import { requestAboutUser } from '../services/actions/user';

function ResetPassword() {
  const dispatch = useDispatch();
  const { isModalActive, message } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive,
    message: state.app.isModalActive.message,
  }));
  const history = useHistory();
  
  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  //функциональность поля code
  const [ codeValue, setCodeValue ] = useState('');
  const refCode = useRef();
  const onChangeCode = (e) => {
    const text = e.target.value;
    setCodeValue(text);
  };

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
  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (codeValue && passwordValue && !errorPasswordValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [codeValue, passwordValue, errorPasswordValue]
  );

  //отправка формы
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });
  const submit = (e) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Осуществляется замена пароля...'));
    dispatch(requestAboutUser(
      {
       "password": passwordValue,
       "token": codeValue
      },
      'password-reset/reset',
      setIsRequestSuccessful));
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      closeModalWithDispatch();
      history.replace({pathname: '/login'});
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

  useLayoutEffect(() => {
    const form = document.forms.registration;
    const inputPassword = form.elements.password;
    const divPassword = form.querySelector('.input_type_password');
    const labelPassword = divPassword.querySelector('.input__placeholder');
    labelPassword.textContent = 'Введите новый пароль';
    inputPassword.addEventListener('blur', (() => {isErrorPasswordValue(divPassword)}));
    inputPassword.addEventListener('focus', (() => {setErrorPasswordValue(false)}));
    return () => {
      inputPassword.removeEventListener('blur', 
        (() => {isErrorPasswordValue(divPassword)}));
      inputPassword.removeEventListener('focus', (() => {setErrorPasswordValue(false)}));
    }
  }, []);

  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form name='registration' id='form' className={`mb-20 ${styles.form}`}>
        <PasswordInput
          value={passwordValue} 
          name='password' 
          onChange={onChangePassword}
        />
        <Input 
          type='text' 
          placeholder='Введите код из письма' 
          size='default' 
          value={codeValue} 
          name='code' 
          ref={refCode} 
          onChange={onChangeCode}
        />
        <Button 
          type='primary' 
          size='medium' 
          id='buttonRegister' 
          onClick={submit} 
          name='button'          
          {...isErrorInForm}>
          Сохранить
        </Button> 
      </form>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
        </p>
        <Link to='/login' className={`text text_type_main-default ml-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </main>
  )
}

export default ResetPassword;