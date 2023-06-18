import { Children, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './PopupWindow.css'
import { Resizable } from 'react-resizable';
import { ResizableBox } from 'react-resizable';


const PopupWindow = ({open, onClose, title, children}) => {
  const [windowWidth, setWindowWidth] = useState(400)
  const [windowHeight, setWindowHeight] = useState(500)
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    // console.log(uiData)
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  if (!open) {
    return <></>
  }

  return (
    <>
        <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
        >
        <ResizableBox  style={{position: 'absolute', left: 'calc(100% - 400px)', top: 'calc(100% - 500px)'}} handle={<div className="modal-resize"></div>}  width={windowWidth} height={windowHeight}  minConstraints={[400, 300]} maxConstraints={[800, 600]}>
            <div 
                className="modal-content"
                ref={draggleRef} 
            >
                <div 
                    className="modal-header"
                    style={{cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                >
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={() => {onClose()}}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </ResizableBox>
        </Draggable>
    </>
  );
};


export default PopupWindow;
