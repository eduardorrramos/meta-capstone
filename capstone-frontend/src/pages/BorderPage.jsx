import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./BorderPage.css";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
import ModalPopulate from "../components/modal";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
("use client");
const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function BorderPage() {
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  const [imageUrl, setImageUrl] = useState(null);
  const [userComments, setUserComments] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  let allRelevantComments = [];

  const [postData, setPostData] = useState({
    userId: "erramoseduardo@gmail.com",
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

  function createCommentDisplays(specificBorderPosts) {
    allRelevantComments = [];
    specificBorderPosts.forEach((element) => {
      console.log(element);
      // if (parseInt(element.borderNum) == borderIndex) {
      //   allRelevantComments.push(element.userInput);
      // }
    });
    return specificBorderPosts;
  }
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/borderdata",
    fetcher
  );
  const crossingData = data;

  useEffect(() => {}, [userComments]);

  let position;
  // let latitude = position.lat;
  // let longitude = position.lng;
  // position = { lat: latitude, lng: longitude };
  const fetchCoordinates = async (address) => {
    const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url)
    const coordinateData = await response.json();
    const newCoords = await coordinateData.results[0].geometry.location;
    setCoordinates(newCoords);
    return newCoords;
  };
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useSWR("http://localhost:5000/usersposts", fetcher);
  let allComments = data2;

  // createCommentDisplays(allComments)
  // createCommentDisplays(allComments)
  // console.log(createCommentDisplays(allComments))

  const fetchIndividualImage = async (location) => {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${location}&media_type=image`
    );
    const data = await response.json();
    const newImage = await data.collection.items[0].links[0].href;
    setImageUrl(newImage);
  };

  if (crossingData) {
    const thisBorder = crossingData.allMexicanPorts[borderIndex];
    fetchIndividualImage(thisBorder.borderRegion[0]);
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
          {/* <div>{borderIndex}</div> */}
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
        <div>
          {allRelevantComments.map((comment) => (
            <div key={comment.id}>{comment.text}</div>
          ))}
        </div>

        <form onSubmit={(input) => submit(input)}>
          <input
            onChange={(input) => handle(input)}
            id="userInput"
            value={postData.userInput}
            placeholder="User Input"
          ></input>
          <button>Post </button>
        </form>
        <img src={imageUrl}></img>

        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
}
export default BorderPage;
