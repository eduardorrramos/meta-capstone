import { useEffect, useState, useContext, useRef, createContext } from "react";
import ApplicationContext from "../applicationContext";
import Modal from "react-modal";
import { useParams } from "react-router-dom";

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
  const userId = useParams().userid;

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (websocket) {
      websocket.addEventListener("message", (event) => {
        if (/\d/.test(event)) {
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
    >
      This alert was sent by {userId}
    </Modal>
  );
}
export default ModalPopulate;
