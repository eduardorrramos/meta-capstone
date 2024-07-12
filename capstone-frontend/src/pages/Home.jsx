import { useEffect, useState, useContext, useRef } from "react";
import "./Home.css";
import Header from "../components/header";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Home({ value }) {
  const ws = value.current;
  const [readyData, setReadyData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const variable = params.userid;

  let allMexicanBorders = [];
  let allCanadianBorders = [];
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
    if (ws) {
      ws.addEventListener("message", (event) => {
        console.log(`this message was received:`);
        openModal();
      });
    }
  }, [setReadyData]);

  const sendAlert = () => {
    ws.send(`Front-End Emergency Alert: User ${variable}`);
  };

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    allCanadianBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      let borderObject = {
        border: currBorder.border[0],
        borderRegion: currBorder.borderRegion[0],
        crossingName: currBorder.crossingName[0],
        hours: currBorder.hours[0],
        portStatus: currBorder.portStatus[0],
        passengerVehicleWait: currBorder.passengerVehicleWait[0],
        pedestrianLaneWait: currBorder.pedestrianLaneWait[0],
      };
      const newBorderObject = JSON.stringify(borderObject);
      allMexicanBorders.push(
        <div key={item} className="border" onClick={() => crossingClick(item)}>
          <div>{item}</div>
          <div>{currBorder.border[0]}</div>
          <div>{currBorder.borderRegion[0]}</div>
          <div>{currBorder.crossingName[0]}</div>
          <div>{currBorder.hours[0]}</div>
          <div>{currBorder.passengerVehicleWait[0]}</div>
          <div>{currBorder.pedestrianLaneWait[0]}</div>
          <div>{currBorder.portStatus[0]}</div>
        </div>
      );
    }
  };
  loadBorderInfo(readyData);
  const crossingClick = (currBorder) => {
    navigate(`/borderpage/${currBorder}`);
    console.log(currBorder);
  };

  return (
    <div className="container">
      <Header variable={variable} />
      <div className="pageInformation">
        <div className="firstdiv">
          Last Updated Date: {readyData.lastUpdatedDate}
        </div>
        <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
        Mexican Borders:
      </div>
      <button onClick={sendAlert}></button>
      <div className="mexicanBorders">{allMexicanBorders}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      ></Modal>
    </div>
  );
}
export default Home;
