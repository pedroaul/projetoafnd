import { ImNewTab } from 'react-icons/im';
import './create.css';
import { FaEraser, FaTrashAlt } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';

function Create() {
    return(
        <div className='container'>
            <div className="textSec">
                <h1 className='workTxt'>AGORA CRIE AQUI O SEU <span className='workSpan'>AUTÔMATO</span>!</h1>
                <p className='workP'>Agora que entendemos um pouquinho sobre os autômatos chegou a hora de você fazer o seu. Bons estudos!</p>
            </div>
            <div className="workArea">
                <div className='bt'><a >{<ImNewTab />}</a></div>
                <div className='bt'><a >{<FaEraser />}</a></div>
                <div className='bt'><a >{<MdEditSquare />}</a></div>
                <div className='bt'><a >{<IoIosSave />}</a></div>
                <div className='bt'><a className='btTr'>{<FaTrashAlt />}</a></div>
            </div>
        </div>
    );
}

export default Create;