import React, { FC } from "react";
import styles from './modalOverlay.module.css';
import PropTypes from "prop-types";

interface IModalOverlay {
  children: JSX.Element;
  closeModalClickOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalOverlay: FC<IModalOverlay> = ({children, closeModalClickOverlay}) => {
  return(
    <div className={styles.modalOverlay} id={'overlay'} onClick={closeModalClickOverlay}>
        {children}
    </div>
  )
}

export default ModalOverlay;