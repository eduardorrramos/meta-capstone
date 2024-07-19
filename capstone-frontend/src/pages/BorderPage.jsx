import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BorderPage.css";
import ModalPopulate from "../components/modal";
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import fetchSpecificBorderComments from "./specificBorderComments";

("use client");
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import {
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Avatar,
  ListItemText,
} from "@mui/material";
import AccountMenu from "../components/newHeader";

function BorderPage() {

  const [coordinates, setCoordinates] = useState(null);
  const [comments, setComments] = useState([]);
  const [resetPosts, setResetPost] = useState(null);
  const [crossingData, setCrossingData] = useState(null);
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  const apiKey ="AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";
  const email = localStorage.getItem("email");
  const date = new Date();
  let currentTime = date.toLocaleTimeString();
  let currentDate = date.toLocaleDateString();

  const [postData, setPostData] = useState({
    userId: email,
    borderNum: borderIndex,
    userInput: "",
    postDate: currentDate,
    postTime: currentTime,
  });

  function handle(input) {
    const newdata = { ...postData };
    newdata[input.target.id] = input.target.value;
    setPostData(newdata);
  }

  function submit(input) {
    input.preventDefault();
    currentTime = date.toLocaleTimeString();
    currentDate = date.toLocaleDateString();
    let oldComments = comments;
    const newInput = {
      userId: email,
      borderNum: borderIndex,
      userInput: input.target[0].value,
      postDate: currentDate,
      postTime: currentTime,
    };
    oldComments.push(newInput);
    setComments(oldComments);
    setPostData({
      userId: email,
      borderNum: borderIndex,
      userInput: "",
      postDate: newInput.postDate,
      postTime: newInput.postTime,
    });

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
        setResetPost(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
        async function fetchComments() {
          const relevantComments = await fetchSpecificBorderComments(borderIndex);
          setComments(relevantComments);
        }
        fetchComments();
  }, [setComments]);
  console.log(comments)

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setCrossingData(data);
        const thisBorder = data.allMexicanPorts[borderIndex];
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          thisBorder.borderRegion[0] +
            thisBorder.borderCrossing +
            " port of entry, Mexico"
        )}&key=${apiKey}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const newCoords = data.results[0].geometry.location;
            setCoordinates(newCoords);
          });
      });
  }, [setCoordinates]);

  if (crossingData) {
    const currentBorder = crossingData.allMexicanPorts[borderIndex];
    return (
      <div>
        <AccountMenu variable={email} />
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
                    {currentBorder.border}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Region: {currentBorder.borderRegion[0]}
                  </Typography>

                  <Typography gutterBottom variant="body1" component="div">
                    Crossing Name: {currentBorder.crossingName[0]}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Hours: {currentBorder.hours[0]}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Vehicle Wait Time: {currentBorder.passengerVehicleWait[0]}{" "}
                    minutes
                    <Typography gutterBottom variant="body1" component="div">
                      Pedestrian Wait Time:{" "}
                      {currentBorder.pedestrianLaneWait[0]} minutes
                    </Typography>
                    Status: {currentBorder.portStatus[0]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <APIProvider apiKey={apiKey}>
              <div style={{ height: "50vh", width: "50vh" }}>
                <Map zoom={10} center={coordinates}></Map>
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
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.postDate}
                          {item.postTime}
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
