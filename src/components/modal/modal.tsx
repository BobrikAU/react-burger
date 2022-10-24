import React, { FC } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import { AnyAction } from "redux";

interface IModal {
  children?: JSX.Element;
  activeModal: string;
  closeModalWithDispatch?: (saveBurger?: boolean) => AnyAction;
}

const Modal: FC<IModal> = ({children, activeModal, closeModalWithDispatch}) => {
  const history = useHistory();

  function closeModal() {
    closeModalWithDispatch ? closeModalWithDispatch() : history.goBack();
  } 

  const closeModalClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'overlay') {
      closeModal();
    };
  }

  const closeModalEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    };
  }

  React.useEffect(
    () => {
      document.addEventListener('keydown', closeModalEsc);
      return () => {
        document.removeEventListener('keydown', closeModalEsc);
      };
    },[]);

  const element = document.getElementById('react-modals');

  return element && ReactDOM.createPortal(
    ( <ModalOverlay closeModalClickOverlay={closeModalClickOverlay}>
        <div className={` pl-10 pr-10 ${activeModal === 'orders' ? 'pt-15 pb-10' :'pt-10 pb-15'} 
                          ${styles.modal} 
                          ${activeModal && styles[activeModal]}
                        `}>
          <div className={styles.closeIcon}>
            <CloseIcon 
              type="primary" 
              onClick={() =>  closeModal()}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>),
    element
  );
}

export default Modal;