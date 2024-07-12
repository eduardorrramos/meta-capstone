import { useEffect, useState, useContext, useRef, createContext } from "react";
import ApplicationContext from "../applicationContext";
import Modal from "react-modal";

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

function ModalPopulate() {
    const { modalIsOpen, setIsOpen, socket } = useContext(ApplicationContext);
    const websocket = socket.current;
    
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
    let userId = null;
    useEffect(() => {
      if (websocket) {
        websocket.addEventListener("message", (event) => {
            if (/\d/.test(event)) {
        userId = event;
          openModal();
            }
        });
      }
    }, [modalIsOpen]);
  

    return (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >This alert was sent by {userId}</Modal>
    );
  }
  export default ModalPopulate;
  