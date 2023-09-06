import React from 'react';
import './css/AlertModal.css';

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="alert-modal">
      <div className="alert-content">
        <h3>Produto Adicionado ao Carrinho</h3>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default AlertModal;
