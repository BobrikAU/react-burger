import { useState, useEffect } from 'react';
import { EmailInput,
         Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './recovery.module.css';
import './globalSelectorsForms.css';

function Recovery() {

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

  //блокировка кнопки отправки формы при некорректности заполнения полей формы
  const [isErrorInForm, setIsErrorInForm ] = useState({ disabled: true });
  useEffect(() => {
    if (emailValue && !errorEmailValue) {
      setIsErrorInForm({});
    } else {
      setIsErrorInForm({ disabled: true })
    }
  }, [emailValue, errorEmailValue])

  //отправка формы
  const submit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const form = document.forms.recovery;
    const inputEmail = form.elements.email;
    const divEmail = form.querySelector('.input_type_email');
    inputEmail.addEventListener('blur', (() => {isErrorEmailValue(divEmail)}));
    inputEmail.addEventListener('focus', (() => {setErrorEmailValue(false)}));
    return () => {
      inputEmail.removeEventListener('blur', 
        (() => {isErrorEmailValue(divEmail)}));
      inputEmail.removeEventListener('focus', (() => {setErrorEmailValue(false)}));
    }
  }, []);
  
  return(
    <main className={styles.main}>
      <h1 className={`text text_type_main-medium mb-5`}>Восстановление пароля</h1>
      <form name='recovery' id='form' className={`mb-20 ${styles.form}`}>
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