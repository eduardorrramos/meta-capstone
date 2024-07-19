import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./BorderPage.css";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
import ModalPopulate from "../components/modal";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { border } from "@chakra-ui/react";
("use client");
const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function BorderPage() {
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  const userId = borderObject.userid;
  const [coordinates, setCoordinates] = useState(null);
  const [comments, setComments] = useState(null);

  const [postData, setPostData] = useState({
    userId: userId,
    borderNum: borderIndex,
    userInput: "",
  });

  function handle(input) {
    const newdata = { ...postData };
    newdata[input.target.id] = input.target.value;
    setPostData(newdata);
  }
  function submit(input) {
    input.preventDefault();
    fetch("http://localhost:5000/usersposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/usersposts",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/borderdata",
    fetcher
  );
  const crossingData = data;

  const fetchCoordinates = async (address) => {
    const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    const response = await fetch(url);
    const coordinateData = await response.json();
    const newCoords = await coordinateData.results[0].geometry.location;
    setCoordinates(newCoords);
    return newCoords;
  };

  useEffect(() => {
    fetch("http://localhost:5000/usersposts")
      .then((response) => response.json())
      .then((data) => {
        let relevantComments = [];
        for (const item in data) {
          if (data[item].borderNum == borderIndex) {
            relevantComments.push(data[item]);
          }
        }
        setComments(relevantComments);
      });
  }, []);

  if (crossingData) {
    const thisBorder = crossingData.allMexicanPorts[borderIndex];
    fetchCoordinates(thisBorder.borderRegion + "mexico border crossing");
    return (
      <div>
        <Header />
        <APIProvider apiKey="AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE">
          <div style={{ height: "50vh", width: "50vh" }}>
            <Map zoom={9} center={coordinates}></Map>
          </div>
        </APIProvider>
        <div className="border">
          <div>{thisBorder.border}</div>
          <div>{thisBorder.borderRegion[0]}</div>
          <div>Crossing Name: {thisBorder.crossingName[0]}</div>
          <div>Hours: {thisBorder.hours[0]}</div>
          <div>
            Vehicle Wait Time: {thisBorder.passengerVehicleWait[0]} minutes
          </div>
          <div>
            Pedestrian Wait Time: {thisBorder.pedestrianLaneWait[0]} minutes
          </div>
          <div>Status: {thisBorder.portStatus[0]}</div>
        </div>
        Relevant Comments
        {comments.map((item, index) => (
          <div key={index} className="border">
            <div>{item.userInput}</div>
          </div>
        ))}
        <form onSubmit={(input) => submit(input)}>
          <input
            onChange={(input) => handle(input)}
            id="userInput"
            value={postData.userInput}
            placeholder="User Input"
          ></input>
          <button>Post </button>
        </form>
        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
}
export default BorderPage;

/*
  const [imageUrl, setImageUrl] = useState(null);
  const fetchIndividualImage = async (location) => {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${location}&media_type=image`
    );
    const data = await response.json();
    const newImage = await data.collection.items[0].links[0].href;
    setImageUrl(newImage);
  };
  fetchIndividualImage(thisBorder.borderRegion[0]);
  <img src={imageUrl}></img>
  */
