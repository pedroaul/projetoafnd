import './create.css';
import { FaEraser, FaTrashAlt } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Circle, Line } from 'fabric';
import { LiaPlusCircleSolid } from 'react-icons/lia';

function Create() {
  
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const isDrawing = useRef(false);
    const lineRef = useRef(null);
    const startCoords = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if(canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 1802,
                height: 1021,
            });
            initCanvas.backgroundColor = '#FFF';
            initCanvas.renderAll();

        initCanvas.on('mouse:down', (opt) => {
        isDrawing.current = true;
        const pointer = initCanvas.getPointer(opt.e);
        startCoords.current = { x: pointer.x, y: pointer.y };

        const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: 'black',
          strokeWidth: 2,
          selectable: false,
          evented: false,
        });

        lineRef.current = line;
        initCanvas.add(line);
      });

      initCanvas.on('mouse:move', (opt) => {
        if (!isDrawing.current || !lineRef.current) return;
        const pointer = initCanvas.getPointer(opt.e);
        lineRef.current.set({ x2: pointer.x, y2: pointer.y });
        initCanvas.renderAll();
      });

      initCanvas.on('mouse:up', () => {
        isDrawing.current = false;
        lineRef.current.set({ selectable: true, evented: true }); // torna a linha selecionável
        lineRef.current = null;
      });

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };

        }
    }, []);

    const addCircle = () => {
        if(canvas) {
            const circle = new Circle({
                top: 250,
                left: 350,
                radius: 50,
                fill: "#F3CA40",
                stroke: "#00000",
            });
            canvas.add(circle);
        }
    }

    const remove = () => {
        if(canvas) {
            canvas.remove(canvas.getActiveObject());
        }
    }

    return(
        <div className='container'>
            <div className="workArea">
                <h1 className='workTxt'>AGORA CRIE AQUI O SEU <span className='workSpan'>AUTÔMATO</span>!</h1>
                <p className='workP'>Agora que entendemos um pouquinho sobre os autômatos chegou a hora de você fazer o seu. Bons estudos!</p>
                <div className='toolbar'>
                    <div className='bt' id='circle' >{<LiaPlusCircleSolid onClick={addCircle} />}</div>
                    <div className='bt' id='arrow'>{<MdClear onClick={remove}/>}</div>
                    <div className='bt'  id='bt_save'>{<IoIosSave />}</div>
                    <div className='bt' id='btTr'>{<FaTrashAlt />}</div>
                </div>
                <canvas ref={canvasRef}  />
            </div>
        </div>
    );
}

export default Create;