import { useState } from 'react';
import { EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './authorization.module.css';
import './globalSelectorsForms.css';

function Authorization() {
  const [ emailValue, setEmailValue ] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const [ passwordValue, setPasswordValue ] = useState('');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
  };
  
  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form id='form' className={`mb-20 ${styles.form}`}>
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
          name='button'>
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