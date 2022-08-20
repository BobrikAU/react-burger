import { useState, useEffect } from 'react';
import { EmailInput,
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './recovery.module.css';
import './globalSelectorsForms.css';

function Recovery() {
  const [ emailValue, setEmailValue ] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (emailValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [emailValue])

  const submit = (e) => {
    e.preventDefault();
  };
  
  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-5`}>Восстановление пароля</h1>
      <form id='form' className={`mb-20 ${styles.form}`}>
        <EmailInput
          name='email' 
          value={emailValue}
          onChange={onChangeEmail}
        />
        <Button 
          type='primary' 
          size='medium' 
          id='buttonRegister' 
          onClick={submit} 
          name='button'
          {...isErrorInForm}>
          Восстановить
        </Button> 
      </form>
      <div className={`mb-4 ${styles.underForm}`}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
        </p>
        <Link 
          to='/login' 
          className={`text text_type_main-default ml-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </main>
  )
}

export default Recovery;