import { useEffect, useState, useContext, useRef, createContext } from "react";
import "./Home.css";
import Header from "../components/header";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import ApplicationContext from "../applicationContext";
import ModalPopulate from "../components/modal";

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


  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    allCanadianBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <div className="border" key={item} onClick={() => crossingClick(item)}>
            <div>
            <img style={{ width: '250px', height: '330px' }} src="https://images.pexels.com/photos/1322077/pexels-photo-1322077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image" />
        <div>{currBorder.borderRegion[0]}</div>
          <div>{currBorder.crossingName[0]}</div>
          <div>{currBorder.portStatus[0]}</div>
          </div>
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
      <div className="mexicanBorders">{allMexicanBorders}</div>
      <div className="pageInformation">
        <div>Last Updated Date: {readyData.lastUpdatedDate}</div>
        <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
      </div>
      <ModalPopulate />
    </div>
  );
}
export default Home;