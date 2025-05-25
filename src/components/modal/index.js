import React from 'react';
import './modal.css';

function Modal({onAddLoop}) {
    return(
        <div className='modal'>
            <a className='modalBt'>Renomear</a>
            <a className='modalBt' onClick={onAddLoop}>Adicionar Loop</a>
        </div>
    );
}

export default Modal;