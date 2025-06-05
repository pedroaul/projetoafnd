import "./create.css";
import { FaTrashAlt } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Group, Line, Path, Text, Triangle } from "fabric";
import { LiaPlusCircleSolid } from "react-icons/lia";
import Modal from "../modal";
import { LuRotateCcw } from "react-icons/lu";

function Create() {
  const [isLineMode] = useState(false); // Estado modo linha
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null); // Canvas e estado
  const isDrawing = useRef(false); // Está desenhando
  const lineRef = useRef(null); // Referência linha
  const startCoords = useRef({ x: 0, y: 0 }); // Pontos de início coordenadas
  const circleCountRef = useRef(0); // Contagem de círculos
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const saveImageToLocal = async () => {
  if (!canvas) return;

  try {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    const blob = await (await fetch(dataURL)).blob();

    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'meu-automato',
      types: [
        {
          description: 'Imagens',
          accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
          },
        },
      ],
    });

    const writableStream = await fileHandle.createWritable();

    const ext = fileHandle.name.split('.').pop();
    if (ext === 'jpg' || ext === 'jpeg') {
      const jpegDataURL = canvas.toDataURL({ format: 'jpeg', quality: 1 });
      const jpegBlob = await (await fetch(jpegDataURL)).blob();
      await writableStream.write(jpegBlob);
    } else if (ext === 'pdf') {
      const canvasEl = canvasRef.current;
      const pdf = new window.jspdf.jsPDF();
      pdf.addImage(canvasEl.toDataURL('image/png'), 'PNG', 10, 10, 180, 100);
      const pdfBlob = pdf.output('blob');
      await writableStream.write(pdfBlob);
    } else {
      await writableStream.write(blob); // default PNG
    }

    await writableStream.close();
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Erro ao salvar o arquivo:', error);
    }
  }
};

  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 1802,
        height: 1021,
      });
      initCanvas.backgroundColor = "#FFF";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      initCanvas.on("mouse:down", (opt) => {
        const evt = opt.e;
        const target = opt.target;

        console.log("Mouse event:", evt);

        if (!isLineMode && !target) {
          isDrawing.current = true;
          const pointer = initCanvas.getPointer(opt.e);
          startCoords.current = { x: pointer.x, y: pointer.y };

          const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: "black",
            strokeWidth: 2,
            selectable: true,
            evented: false,
          });
          lineRef.current = line;
          initCanvas.add(line);
        }
      });

      initCanvas.on("mouse:move", (opt) => {
        if (!isDrawing.current || !lineRef.current) return;
        const pointer = initCanvas.getPointer(opt.e);
        lineRef.current.set({ x2: pointer.x, y2: pointer.y });
        initCanvas.renderAll();
      });

      initCanvas.on("mouse:up", () => {
        if (!isDrawing.current) return;
        isDrawing.current = false;
        if (lineRef.current) {
          lineRef.current.set({ selectable: true, evented: true }); 
          lineRef.current = null;
        }
      });
      initCanvas.upperCanvasEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        
        const pointer = initCanvas.getPointer(e);
        const target = initCanvas.findTarget(e, false);

        if (target && target.type === "group") {
            initCanvas.setActiveObject(target);
            setSelectedGroup(target); 
            setModalVisible(true);
            setModalPosition({ x: e.clientX, y: e.clientY });
        }


        if (target && target.type === "group") {
            initCanvas.setActiveObject(target);
            setModalVisible(true);
            setModalPosition({ x: e.clientX, y: e.clientY });
            
        } else {
          setModalVisible(false);
          
        }
      });

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    function HandleClickOutside(e) {
      setModalVisible(false);
    }

    if (modalVisible) {
      document.addEventListener("mousedown", HandleClickOutside);
      
    }

    return () => {
      document.removeEventListener("mousedown", HandleClickOutside);
    };
  }, [modalVisible]);

  const addLoopToState = (stateGroup) => {
    const center = stateGroup.getCenterPoint();

    const loopPath = new Path(
      `M ${center.x - 24} ${center.y - 45} C ${center.x - 40} ${
        center.y - 145
      }, ${center.x + 40} ${center.y - 145}, ${center.x + 25}  ${center.y - 50}`,
      {
        stroke: "black",
        fill: "",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      }
    );

    const arrow = new Triangle({
      left: center.x + 33,
      top: center.y - 43,
      angle: 180,
      width: 15,
      height: 15,
      fill: "black",
      selectable: false,
      evented: false,
    });

    const groupAll = new Group([...stateGroup._objects, loopPath, arrow], {
        left: stateGroup.left,
        top: stateGroup.top,
        hasBorders: false,
        hasControls: true,
        evented: true,
    })

    canvas.add(groupAll);
    canvas.setActiveObject(groupAll);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (canvas) {
      const offset = 115 * circleCountRef.current;
      const stateLabel = `q${circleCountRef.current + 1}`;
      const circle = new Circle({
        // top: 250,
        // left: 350 + offset,
        radius: 50,
        fill: "#F3CA40",
        stroke: "#00000",
        originX: "center",
        originY: "center",
        // evented: true,
      });

      const label = new Text(stateLabel, {
        fontSize: 20,
        originX: "center",
        originY: "center",
      });

      const group = new Group([circle, label], {
        top: 250,
        left: 350 + offset,
        hasBorders: false,
        hasControls: false,
        evented: true,
      });

      canvas.add(group);
      circleCountRef.current += 1;
    }
  };

  const addLoopToSelected = () => {
    const selected = canvas.getActiveObject();
    console.log("Objeto selecionado:", selected);
    if (selected && selected.type === "group") {
      addLoopToState(selected);
    }
  };

  const renameState = () => {
  const selected = canvas.getActiveObject();
  if (selected && selected.type === "group") {
    const textObject = selected._objects.find(obj => obj.type === "text");
    if (!textObject) return;

    const center = selected.getCenterPoint();
    const input = document.createElement("input");
    input.type = "text";
    input.value = textObject.text;
    input.style.position = "absolute";
    input.style.left = `${canvas._offset.left + center.x - 50}px`;
    input.style.top = `${canvas._offset.top + center.y - 10}px`;
    input.style.width = "100px";
    input.style.fontSize = "16px";
    input.style.zIndex = "1000";
    input.style.textAlign = "center";

    document.body.appendChild(input);
    input.focus();

    input.onblur = () => {
      textObject.set({ text: input.value });
      canvas.renderAll();
      document.body.removeChild(input);
    };

    input.onkeydown = (e) => {
      if (e.key === "Enter") {
        input.blur(); 
      }
    };
  }
};

const clearCanvas = () => {
  if (canvas) {
    canvas.clear();
    canvas.backgroundColor = "#FFF"; 
    canvas.renderAll();
    circleCountRef.current = 0;
  }
};

  const remove = () => {
    if (canvas) {
      const activeObj = canvas.getActiveObject();
      canvas.remove(canvas.getActiveObject());
      if (activeObj && activeObj.type === "group") {
      const hasCircle = activeObj._objects.some(obj => obj.type === "circle");
      if (hasCircle) {
        circleCountRef.current = Math.max(0, circleCountRef.current - 1);
      }
    }
    canvas.remove(activeObj);
    }
  };

  return (
    <div className="container" id="criar">
      <div className="workArea">
        <h1 className="workTxt">
          AGORA CRIE AQUI O SEU <span className="workSpan">AUTÔMATO</span>!
        </h1>
        <p className="workP">
          Agora que entendemos um pouquinho sobre os autômatos chegou a hora de
          você fazer o seu. Bons estudos!
        </p>
        <div className="toolbar">
          <div className="bt" id="circle" onClick={addCircle}>
            {<LiaPlusCircleSolid />}
          </div>
          <div className="bt" id="loop" onClick={addLoopToSelected}>
            {<LuRotateCcw />}
          </div>
          <div className="bt" id="remove" onClick={remove}>
            {<MdClear />}
          </div>
          <div className="bt">
            <a id="bt_save"  onClick={saveImageToLocal}>
              {<IoIosSave />}
            </a>
          </div>
          <div className="bt" id="btTr" onClick={clearCanvas}>
            {<FaTrashAlt />}
          </div>
        </div>
        <canvas ref={canvasRef}></canvas>
      </div>
      {modalVisible && (
        <div
          style={{
            top: modalPosition.y,
            left: modalPosition.x,
            position: "absolute",
          }}
        >
          <Modal 
            onAddLoop={addLoopToSelected} 
            onRenameState={renameState}/>
        </div>
      )}
    </div>
  );
}

export default Create;