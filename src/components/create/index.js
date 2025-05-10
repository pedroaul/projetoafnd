import { ImNewTab } from 'react-icons/im';
import './create.css';
import { FaEraser, FaTrashAlt } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Circle } from 'fabric';


function Create() {
  
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if(canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 1802,
                height: 1021,
            });

            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };

        }
    }, []);

    const addCircle = ()=> {
        if(canvas) {
            const circle = new Circle({
                top: 250,
                left: 350,
                radius: 50,
                fill: "#F3CA40",
            });
            canvas.add(circle);
        }
    }

    return(
        <div className='container'>
            <div className="textSec">
                <h1 className='workTxt'>AGORA CRIE AQUI O SEU <span className='workSpan'>AUTÔMATO</span>!</h1>
                <p className='workP'>Agora que entendemos um pouquinho sobre os autômatos chegou a hora de você fazer o seu. Bons estudos!</p>
            </div>
            <div className="workArea">
                <div className='toolbar'>
                    <div className='bt' id='circle' >{<ImNewTab onClick={addCircle} />}</div>
                    <div className='bt' id='arrow'>{<FaEraser />}</div>
                    <div className='bt' id='undo'>{<MdEditSquare />}</div>
                    <div className='bt'  id='bt_save'>{<IoIosSave />}</div>
                    <div className='bt' id='btTr'>{<FaTrashAlt />}</div>
                </div>
                <canvas id='canvas' ref={canvasRef} />
            </div>
        </div>
    );
}

export default Create;