import { useState, useEffect } from 'react';
import { EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './authorization.module.css';
import './globalSelectorsForms.css';

function Authorization() {

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
  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (emailValue && !errorEmailValue && passwordValue && !errorPasswordValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [emailValue, errorEmailValue, passwordValue, errorPasswordValue]);
  
  //отправка формы
  const submit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const form = document.forms.authorization;
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
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form name='authorization' id='form' className={`mb-20 ${styles.form}`}>
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
          {...isErrorInForm}>
          Войти
        </Button> 
      </form>
      <div className={`mb-4 ${styles.underForm}`}>
        <p className='text text_type_main-default text_color_inactive'>
          Вы — новый пользователь?
        </p>
        <Link 
          to='/register' 
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?
        </p>
        <Link 
          to='/forgot-password' 
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </div>
    </main>
  )
}

export default Authorization;