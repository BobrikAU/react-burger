import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Input, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../utils/hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './resetPassword.module.css';
import './globalSelectorsForms.css';
import { closeModal, openModalActionCreator } from '../services/actions/app';
import { requestAboutUser } from '../services/actions/user';
import { IIsRequestSuccessful } from '../utils/types';

function ResetPassword() {
  const dispatch = useDispatch();
  const { isModalActive } = useSelector (state => ({
    isModalActive: state.app.isModalActive.isModalActive
  }));
  const history = useHistory();
  const location = useLocation<{from: string}>();
  
  const closeModalWithDispatch = () => dispatch(closeModal(isModalActive));

  //проверка предварительного посещения recovery
  useLayoutEffect(() => {
    if (!location.state || !('isRecovery' in location.state)) {
        history.replace({pathname: '/forgot-password'})
    }
  }, []);

  //функциональность поля code
  const [ codeValue, setCodeValue ] = useState<string>('');
  const refCode = useRef(null);
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setCodeValue(text);
  };

  //функциональность поля password
  const [ passwordValue, setPasswordValue ] = useState<string>('');
  const [ errorPasswordValue, setErrorPasswordValue ] = useState<boolean>(false);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const isErrorPasswordValue = (divPassword: HTMLElement | null) => {
    setTimeout( () => {
      if (divPassword && divPassword.classList.contains("input_status_error")) {
        setErrorPasswordValue(true);
      } else {
        setErrorPasswordValue(false);
      }
    }, 100);
  };

  //блокировка кнопки отправки формы при некорректности заполнения полей формы
  const [isErrorInForm, setIsErrorInForm ] = useState<{disabled?: boolean}>({ disabled: true });
  useEffect(() => {
    if (codeValue && passwordValue && !errorPasswordValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [codeValue, passwordValue, errorPasswordValue]
  );

  //отправка формы
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState<IIsRequestSuccessful>({
                                                                      value: undefined,
                                                                      message: '',
                                                                    });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(openModalActionCreator('error', 'Осуществляется замена пароля...'));
    dispatch(requestAboutUser({
      requestOptions: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { 
            "password": passwordValue,
            "token": codeValue
          }
        ),
      },
      endpointUrl: 'password-reset/reset',
      setIsRequestSuccessful}));
  };
  useEffect(() => {
    if (isRequestSuccessful.value) {
      closeModalWithDispatch();
      if (location.state.from) {
        history.replace({pathname: '/login', state: {from: location.state.from}});
      } else {
        history.replace({pathname: '/login'});
      }
    }
    if (isRequestSuccessful.value === false) {
      dispatch(openModalActionCreator('error', isRequestSuccessful.message));
    }
  }, [isRequestSuccessful]);

  const form = useRef<HTMLFormElement>(null);
  useLayoutEffect(() => {
    const htmlElements: {[name: string]: HTMLElement | null} = {};
    if (form.current) {
      htmlElements.inputPassword = form.current.querySelector("[name='password']");
      htmlElements.divPassword = form.current.querySelector('.input_type_password');
      htmlElements.labelPassword = htmlElements.divPassword && 
        htmlElements.divPassword.querySelector('.input__placeholder');
    }
    const { inputPassword, divPassword, labelPassword } = htmlElements;
    if (inputPassword && labelPassword) {
      labelPassword.textContent = 'Введите новый пароль';
      inputPassword.addEventListener('blur', (() => {isErrorPasswordValue(divPassword)}));
      inputPassword.addEventListener('focus', (() => {setErrorPasswordValue(false)}));
      return () => {
        inputPassword.removeEventListener('blur', 
          (() => {isErrorPasswordValue(divPassword)}));
        inputPassword.removeEventListener('focus', (() => {setErrorPasswordValue(false)}));
      }
    }
  }, []);

  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form 
        name='registration' 
        id='form' 
        className={`mb-20 ${styles.form}`}
        ref={form}
        onSubmit={submit}>
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
          htmlType='submit'
          type='primary' 
          size='medium' 
          id='buttonRegister' 
          name='button'          
          {...isErrorInForm}>
          Сохранить
        </Button> 
      </form>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
        </p>
        <Link to={
                  location.state ? 
                  {pathname: '/login', state: {...location.state}} : 
                  '/login'
                 }
              className={`text text_type_main-default ml-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </main>
  )
}

export default ResetPassword;