import './create.css';
import { FaTrashAlt } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Circle, Line } from 'fabric';
import { LiaPlusCircleSolid } from 'react-icons/lia';
import Modal from '../modal';

function Create() {
    const [isLineMode] = useState(false); // Estado modo linha
    const canvasRef = useRef(null); 
    const [canvas, setCanvas] = useState(null); // Canvas e estado
    const isDrawing = useRef(false); // Está desenhando
    const lineRef = useRef(null); // Referência linha
    const startCoords = useRef({ x: 0, y: 0 }); // Pontos de início coordenadas
    const circleCountRef = useRef(0); // Contagem de círculos
    const[modalVisible, setModalVisible] = useState(false);
    

    useEffect(() => {
        if(canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 1802,
                height: 1021,
            });
            initCanvas.backgroundColor = '#FFF';
            initCanvas.renderAll();

        initCanvas.on('mouse:down', (opt) => {
            const evt = opt.e;
            const target = opt.target;

            console.log("Mouse event:", evt);

        if (!isLineMode && !target ) {
        isDrawing.current = true;
        const pointer = initCanvas.getPointer(opt.e);
        startCoords.current = { x: pointer.x, y: pointer.y};

          const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: 'black',
          strokeWidth: 2,
          selectable: true,
          evented: false,
        });
            lineRef.current = line;
            initCanvas.add(line);
        }
      });

      initCanvas.on('mouse:move', (opt) => {
        if (!isDrawing.current || !lineRef.current) return;
        const pointer = initCanvas.getPointer(opt.e);
        lineRef.current.set({ x2: pointer.x, y2: pointer.y });
        initCanvas.renderAll();
      });

      initCanvas.on('mouse:up', () => {
        if(!isDrawing.current) return;
        isDrawing.current = false;
        if(lineRef.current) {
            lineRef.current.set({ selectable: true, evented: true }); // torna a linha selecionável
            lineRef.current = null;
        }
      });

            setCanvas(initCanvas);

            initCanvas.upperCanvasEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                
                const pointer = initCanvas.getPointer(e);
                const target = initCanvas.findTarget(e, false);
                
                if (target && target.type === 'circle') {
                    setModalVisible(true);

                    console.log('Clique com o direito');
                } else {
                    setModalVisible(false);
                }
            })

            return () => {
                initCanvas.dispose();
            };

        }
    }, []);

    const addCircle = () => {
        if(canvas) {

            const offset = 115 * circleCountRef.current;

            const circle = new Circle({
                top: 250,
                left: 350 + offset,
                radius: 50,
                fill: "#F3CA40",
                stroke: "#00000",
                evented: true,
            });
            canvas.add(circle);
            circleCountRef.current += 1;
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
                    <div className='bt' id='circle' onClick={addCircle}>{<LiaPlusCircleSolid />}</div>
                    <div className='bt' id='remove' onClick={remove}>{<MdClear/>}</div>
                    <div className='bt'  id='bt_save'>{<IoIosSave />}</div>
                    <div className='bt' id='btTr'>{<FaTrashAlt />}</div>
                </div>
                <div>
                    {modalVisible && (
                        <Modal
                            
                        />
                    )}
                </div>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}

export default Create;