import { useEffect, useContext , useState} from "react";
import ApplicationContext from "../applicationContext";
import Modal from "react-modal";
import Alert from '@mui/material/Alert';
            import { APIProvider, Map } from "@vis.gl/react-google-maps";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px", // smaller width
    height: "80px", // smaller height
    backgroundColor: "#E23B17", // red background
    color: "#FFFFFF", // white text
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
  },
};

function ModalPopulate() {
  const { modalIsOpen, setIsOpen, socket, userName } =
    useContext(ApplicationContext);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";


  const websocket = socket.current;

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);

    });
  }, []);

  useEffect(() => {
    if (websocket) {
      websocket.addEventListener("message", (event) => {
        if (/\d/.test(event)) {
          const message =
            "Emergency Alert from Back-End: Front-End Emergency Alert 1!: user Eduardo Ramos at Los Indios coords 37.4811576";
          const location = message.match(/at (.*) coords/)[1];
          openModal(location);
        }
      });
    }
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Emergency Modal"
    >
      This alert was sent by {userName} at {userLongitude}, {userLatitude}!
       {/* <APIProvider apiKey={apiKey}>
              <div style={{ height: "30vh", width: "30vh" }}>
                <Map zoom={10} center={[userLatitude, userLongitude]}></Map>
              </div>
            </APIProvider> */}
    </Modal>
  );
}
export default ModalPopulate;
