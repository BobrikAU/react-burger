import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { closeModal } from '../../services/actions/app';

function Modal({children, activeModal}) {
  
  const dispatch = useDispatch();
  const stateIngredientDetails = useSelector(state => state.ingredientDetails)
  /*const closeModal111 = dispatch({
    type: CLOSE_MODAL,
  });*/

  const closeModalClickOverlay = (e) => {
    if (e.target.id === 'overlay') {
      dispatch(closeModal(stateIngredientDetails));
    };
  }

  const closeModalEsc = (e) => {
    if (e.key === 'Escape') {
      dispatch(closeModal(stateIngredientDetails));
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
    ( <ModalOverlay closeModalClickOverlay={closeModalClickOverlay}>
        <div className={`pl-10 pt-10 pr-10 pb-15 ${styles.modal} ${styles[activeModal]}`}>
          <div className={styles.closeIcon}>
            <CloseIcon type="primary" onClick={() => dispatch(closeModal(stateIngredientDetails))}/>
          </div>
          {children}
        </div>
      </ModalOverlay>),
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  activeModal: PropTypes.string.isRequired
}

export default Modal;