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
import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import {
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Avatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import AccountMenu from "../components/newHeader";

function BorderPage() {
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  const userId = borderObject.userid;
  const [coordinates, setCoordinates] = useState(null);
  const [comments, setComments] = useState(null);
  const [resetPosts, setResetPost] = useState(null);

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
      .then((data) => {
        console.log(data);
        setResetPost(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {}, [resetPosts]);

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
        <AccountMenu variable={userId} />
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <Card sx={{ maxWidth: 400 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image="fawfwafwafa"
                  alt="user google photo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {thisBorder.border}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Region: {thisBorder.borderRegion[0]}
                  </Typography>

                  <Typography gutterBottom variant="body1" component="div">
                    Crossing Name: {thisBorder.crossingName[0]}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Hours: {thisBorder.hours[0]}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Vehicle Wait Time: {thisBorder.passengerVehicleWait[0]}{" "}
                    minutes
                    <Typography gutterBottom variant="body1" component="div">
                      Pedestrian Wait Time: {thisBorder.pedestrianLaneWait[0]}{" "}
                      minutes
                    </Typography>
                    Status: {thisBorder.portStatus[0]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <APIProvider apiKey="AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE">
              <div style={{ height: "50vh", width: "50vh" }}>
                <Map zoom={9} center={coordinates}></Map>
              </div>
            </APIProvider>
          </Grid>

          <Grid xs={12} sx={{ padding: "50px" }}>
            Comments
            <List
              sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}
            >
              {comments.map((item, index) => (
                <ListItem divider={true} key={index} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="wafwafwafwafw.com" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.userId}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.userInput}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              ))}
            </List>
            <form onSubmit={(input) => submit(input)}>
              <input
                onChange={(input) => handle(input)}
                id="userInput"
                value={postData.userInput}
                placeholder="User Input"
              ></input>
              <button>Post </button>
            </form>
          </Grid>
        </Grid>
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
