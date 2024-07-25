import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BorderPage.css";
import ModalPopulate from "../components/modal";
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import fetchSpecificBorderComments from "./specificBorderComments";
import AccountMenu from "../components/newHeader";
import ClipLoader from "react-spinners/ClipLoader";
("use client");
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import {
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Button,
  Avatar,
  ListItemText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import EmergencyAlert from "../components/emergencyAlert";

function BorderPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [comments, setComments] = useState([]);
  const [resetPosts, setResetPost] = useState(null);
  const [crossingData, setCrossingData] = useState(null);
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  console.log(borderIndex);
  const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";
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
    likes: 0,
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
      likes: 0,
    };
    oldComments.push(newInput);
    setComments(oldComments);
    setPostData({
      userId: email,
      borderNum: borderIndex,
      userInput: "",
      postDate: newInput.postDate,
      postTime: newInput.postTime,
      likes: 0,
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
  }, [setResetPost]);

  function deleteComment(index) {
    setComments([]); 
    fetch(`http://localhost:5000/usersposts/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResetPost(data);
      })
      .catch((error) => console.error(error));
  }
  function likeComment(index) {
    setComments(); 
    fetch(`http://localhost:5000/usersposts/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResetPost(data);
      });
  }

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setCrossingData(data);
        const thisBorder = data.allMexicanPorts[borderIndex];
        const thisBorderName = thisBorder.borderRegion[0] + thisBorder.crossingName[0];
        fetch(`http://localhost:5000/borderpage/${thisBorderName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setAddress(data.newAddress);
            setCoordinates(data.newCoords);
          });
      });
  }, [setCoordinates]);

  const fetchIndividualImage = async (location) => {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${location}&media_type=image`
    );
    const data = await response.json();
    const newImage = await data.collection.items[0].links[0].href;
    setImageUrl(newImage);
  };

  if (crossingData) {
    const currentBorder = crossingData.allMexicanPorts[borderIndex];
    fetchIndividualImage(currentBorder.borderRegion[0]);
    
    return (
      <Grid container className="wholePage">
        <Grid item md={8} xs={8} sx={{ padding: "60px" }}>
          <Typography
            sx={{ minWidth: 100, position: "absolute", top: 0, left: 0 }}
          >
            {" "}
            <a
              href={`http://localhost:5173/home`}
              style={{ transform: "translateY(100%)" }}
            >
              <ArrowBack />
            </a>
          </Typography>
          <img src={imageUrl}></img>
          <img className="ImageOverlay" src={imageUrl} />
        </Grid>

        <Grid item xs={4} md={4}>
          <AccountMenu variable={email} />
          <div sx={{ minHeight: "100vh", overflow: "auto", maxWidth: 500 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              align="left"
              display="block"
              margin="60px 0 0 0"

            >
              <b>{currentBorder.borderRegion[0]}</b>
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              align="left"
              component="div"
              color="textSecondary"
              fontSize="small"
              opacity={0.5}
            >
              Pedestrian-Friendly
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              margin="10px 0 0 0"
            >
              {currentBorder.pedestrianLaneWait[0] || 0} minutes Vehicle Wait
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                margin="8px 0 0 0"
              >
                {currentBorder.pedestrianLaneWait[0] || 0} minutes Pedestrian
                Wait
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                margin="8px 0 0 0"
              >
                Crossing Name: {currentBorder.crossingName[0]}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                align="left"
                display="block"
                margin="8px 0 0 0"
              >
                <b>Details</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                margin="8px 0 0 0"
              >
                <b>Border </b>
                {currentBorder.border}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                margin="8px 0 0 0"
              >
                <b>Hours </b>
                {currentBorder.hours[0]}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                margin="8px 0 40px 0"
              >
                Status: {currentBorder.portStatus[0]}
              </Typography>
            </Typography>
            <APIProvider apiKey={apiKey}>
              <div style={{ height: "30vh", width: "30vh" }}>
                <Map zoom={10} center={coordinates}></Map>
              </div>
            </APIProvider>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              align="left"
              margin="8px 0 40px 0"
            >
              {address}
            </Typography>

          </div>
        </Grid>

        <Grid item xs={12} sx={{ padding: "50px" }}>
          <div>
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
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        ></Typography>
                        {"       " + item.postDate} {item.postTime} Likes{" "}
                        {item.likes}
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                  <Button
                    onClick={() => deleteComment(item.id)}
                    color="primary"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => likeComment(item.id)}
                    color="secondary"
                  >
                    Upvote
                  </Button>
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
          </div>

          <ModalPopulate />
        </Grid>
      </Grid>
    );
  } else {

    return(
    <ClipLoader
            color="#1877F2"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />);
  }
  
}
export default BorderPage;
