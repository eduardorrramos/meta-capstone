import { useEffect, useState, useContext, useRef, createContext } from "react";
import "./Home.css";
import Header from "../components/header";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import ApplicationContext from "../applicationContext";

function Home() {
  const { modalIsOpen, setIsOpen, socket } = useContext(ApplicationContext);
  const [readyData, setReadyData] = useState([]);
  let allMexicanBorders = [];
  let allCanadianBorders = [];
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userid;
  const websocket = socket.current;

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
  }, [setReadyData]);

  const sendAlert = () => {
    websocket.send(`Front-End Emergency Alert: User ${userId}`);
  };

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    allCanadianBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
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
  };

  return (
    <div className="container">
      <Header variable={userId} />
      <div className="pageInformation">
        <div className="firstdiv">
          Last Updated Date: {readyData.lastUpdatedDate}
        </div>
        <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
        Mexican Borders:
      </div>
      <button onClick={sendAlert}></button>
      <div className="mexicanBorders">{allMexicanBorders}</div>
      <Modal/>
    </div>
  );
}
export default Home;
