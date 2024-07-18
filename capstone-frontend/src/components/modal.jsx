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
  const userId = sessionStorage.getItem('name')
  // const userLocation = useRef(null);


  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //      const userLocation = position
  // }) 
  // }, []);
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
      This alert was sent by {userId} at 
    </Modal>
  );
}
export default ModalPopulate;
