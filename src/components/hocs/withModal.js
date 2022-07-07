import React from "react";
import ReactDOM from "react-dom";
import styles from './withModal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const withModal = (WrappedComponent) => ({closeModal, numberOrder, orderExecution}) => {
  
  const closeModalClickOverlay = (e) => {
    if (e.target.id === 'overlay') {
      closeModal();
    };
  }

  const closeModalEsc = (e) => {
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

  return ReactDOM.createPortal(
    ( <div className={styles.modalOverlay} onClick={closeModalClickOverlay} id={'overlay'}>
        <div className={`pl-10 pt-10 pr-10 pb-15 ${styles.modal}`}>
          <div className={styles.closeIcon}><CloseIcon type="primary" onClick={closeModal}/></div>
          <WrappedComponent numberOrder={numberOrder} orderExecution={orderExecution}/>
        </div>
      </div>),
    document.getElementById('react-modals')
  );
}

withModal.propTypes = {
  closeModal: PropTypes.func,
  numberOrder: PropTypes.string,
  orderExecution: PropTypes.string
}

export default withModal;