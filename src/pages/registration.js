import { useState, useRef } from 'react';
import { Input, 
         EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import './globalSelectorsForms.css';

function Registration() {

  const [ nameValue, setNameValue ] = useState('');
  const refName = useRef();
  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

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
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form id='form' className={`mb-20 ${styles.form}`}>
        <Input 
          type='text' 
          placeholder='Имя' 
          size='default' 
          value={nameValue} 
          name='name' 
          ref={refName} 
          onChange={onChangeName}
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
          name='button'>
          Зарегистрироваться
        </Button> 
      </form>
      <div className={styles.underForm}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Link to='/login' className={`text text_type_main-default ml-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </main>
  )
}

export default Registration;