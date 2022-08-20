import { useState, useRef, useEffect } from 'react';
import { Input, 
         EmailInput, 
         PasswordInput, 
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import './globalSelectorsForms.css';

function Registration() {

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

  const [ emailValue, setEmailValue ] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const [ passwordValue, setPasswordValue ] = useState('');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (nameValue && !errorName && emailValue && passwordValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [nameValue, errorName, emailValue, passwordValue])

  const submit = (e) => {
    e.preventDefault();
  };

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
          {...isErrorInForm}>
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