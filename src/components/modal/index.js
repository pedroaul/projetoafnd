import React, { useState } from 'react';
import './modal.css';

function Modal({onAddLoop, onRenameState}) {
    const [newName, setNewName] = useState('');

    const handleRename = () => {
        if(newName.trim() !== '') {
            onRenameState(newName);
        }
    };
    
    return(
        <div className='modal'>
            <a className='modalBt' onClick={handleRename}>Renomear</a>
            <a className='modalBt' onClick={onAddLoop}>Adicionar Loop</a>
        </div>
    );
}

export default Modal;