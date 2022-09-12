import React from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.close}></div>;
};

const ModalOverlays = (props) => {
  return (
    <div className={styles.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const portalId = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop close={props.onClose} />, portalId)}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalId
      )}
    </React.Fragment>
  );
};

export default Modal;
