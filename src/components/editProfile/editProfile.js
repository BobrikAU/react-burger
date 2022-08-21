import styles from './editProfile.module.css';
import './editProfile.css';
import { useState, useRef } from 'react';
import { Input, EmailInput, Button } from 
  '@ya.praktikum/react-developer-burger-ui-components';

function EditProfile () {
  
  //поле input name
  const [ nameValue, setNameValue] = useState('Марк');
  const [ isInputNameActive, setIsInputNameActive ] = useState({disabled: true});
  const [ isErrorInName, setIsErrorInName ] = useState(false);
  const nameRef = useRef();
  const changeNameValue = (e) => {
    const value = e.target.value;
    setNameValue(value);
    if (value.length < 2 && isErrorInName === false) {
      setIsErrorInName(true);
    } 
    if (value.length >= 2 && isErrorInName === true) {
      setIsErrorInName(false);
    }
  };
  const onIconClickName = async() => {
    await setIsInputNameActive({});
    nameRef.current.focus();
  };
  const onBlurName = () => {
    setIsInputNameActive({disabled: true});
  };

  //поле input email
  const [valueEmail, setValueEmail] = useState('mail@stellar.burgers');
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  }

  //поле input password
  const [valuePassword, setValuePassword] = useState('jskfur');
  const [ isInputPasswordActive, setIsInputPasswordActive ] = useState({disabled: true});
  const [ isErrorInPassword, setIsErrorInPassword ] = useState(false);
  const passwordRef = useRef();
  const changePasswordValue = (e) => {
    const value = e.target.value;
    setValuePassword(value);
    if (value.length < 6 && isErrorInPassword === false) {
      setIsErrorInPassword(true);
    } 
    if (value.length >= 6 && isErrorInPassword === true) {
      setIsErrorInPassword(false);
    }
  };
  const onIconClickPassword = async() => {
    await setIsInputPasswordActive({});
    passwordRef.current.focus();
  };
  const onBlurPassword = () => {
    setIsInputPasswordActive({disabled: true});
  };

  return(
    <>
      <form name='editProfil' id='editProfil' className={styles.editProfileForm}>
        <Input 
          name='name' 
          type='text' 
          placeholder='Имя' 
          ref={nameRef} 
          value={nameValue} 
          onChange={changeNameValue}
          icon='EditIcon'
          {...isInputNameActive}
          onIconClick={onIconClickName}
          onBlur={onBlurName} 
          error={isErrorInName}
          errorText='Должно быть не менее 2 символов' />
        <EmailInput 
          onChange={onChangeEmail} 
          value={valueEmail} 
          name={'email'}/>
        <Input 
          name='password' 
          type='password' 
          placeholder='Пароль'
          value={valuePassword}
          ref={passwordRef} 
          onChange={changePasswordValue}
          icon='EditIcon'
          {...isInputPasswordActive}
          onIconClick={onIconClickPassword}
          onBlur={onBlurPassword}
          error={isErrorInPassword}
          errorText='Должно быть не менее 6 символов' />
        <div className={styles.buttonsContainer}>
          <Button type='secondary' size='medium'>Отмена</Button>
          <Button type='primary' size='medium'>Сохранить</Button>
        </div>
      </form>
    </>
  )
}

export default EditProfile;