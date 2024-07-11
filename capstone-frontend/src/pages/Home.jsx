import { useEffect, useState, useContex, useRef } from "react";
import "./Home.css";
import Header from "../components/header";
import { useNavigate, useParams } from "react-router-dom";

function Home({ value }) {
  const [readyData, setReadyData] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const variable = params.userid;

  let allMexicanBorders = [];
  let allCanadianBorders = [];
  const ws = value.current;

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
  }, [setReadyData]);

  const sendAlert = () => {
    ws.send("emergency alert");
  };

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    allCanadianBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <div
          key={item}
          className="border"
          onClick={() => crossingClick(currBorder)}
        >
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

  const crossingClick = (item) => {
    navigate(`/borderpage/${item}`);
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
    </div>
  );
}
export default Home;
