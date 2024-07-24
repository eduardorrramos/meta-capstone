import { useEffect, useContext } from "react";
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
  const { modalIsOpen, setIsOpen, socket, userName } = useContext(ApplicationContext);
  const websocket = socket.current;

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = position;
    });
  }, []);

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
      This alert was sent by {userName} 
    </Modal>
  );
}
export default ModalPopulate;
