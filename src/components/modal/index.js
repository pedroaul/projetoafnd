import React from 'react';
import './modal.css';

function Modal({ onConnect }) {
    return(
        <div className='modal'>
            <a className='modalBt'>Renomear</a>
            <a className='modalBt' onClick={onConnect}>Conectar Estado</a>
        </div>
    );
}

export default Modal;