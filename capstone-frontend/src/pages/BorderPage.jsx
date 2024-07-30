import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BorderPage.css";
import ModalPopulate from "../components/modal";
import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import fetchSpecificBorderComments from "./specificBorderComments";
import AccountMenu from "../components/header";
import ClipLoader from "react-spinners/ClipLoader";
("use client");
import { Typography, Grid } from "@mui/material";
import {
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Button,
  Avatar,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";

function BorderPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [comments, setComments] = useState([]);
  const [resetPosts, setResetPost] = useState(null);
  const [crossingData, setCrossingData] = useState(null);
  const borderObject = useParams();
  const borderIndex = borderObject.borderid;
  const apiKey = "AIzaSyDnk1NQgt08aY9-4tS0ZcG9WvzJc7hsuWE";
  const email = sessionStorage.getItem("email");
  const date = new Date();
  let currentTime = date.toLocaleTimeString();
  let currentDate = date.toLocaleDateString();
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  async function submit(input) {
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

    await fetch("http://localhost:5000/usersposts", {
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
  }, [setResetPost, setComments]);

  async function deleteComment(index) {
    setComments((comments) => {
      return comments.filter((comment) => comment.id !== index);
    });

    await fetch(`http://localhost:5000/usersposts/${index}`, {
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
    setComments(comments);
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
        const thisBorderName =
          thisBorder.borderRegion[0] + thisBorder.crossingName[0];
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

  const bookmarkCrossing = (borderIndex) => {
    console.log(borderIndex)
    if (!isBookmarked) {
    fetch(`http://localhost:5000/userprofile/${borderIndex}?email=${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      setIsBookmarked(true)
    }
    else {
      setIsBookmarked(false)
      async function deleteBookmark(borderIndex) {
        await fetch(`http://localhost:5000/bookmarked/${borderIndex}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
          .catch((error) => console.error(error));
      }
      deleteBookmark(borderIndex)
    }
  };

  useEffect(() => {
    const getBookmarks = () => {
      fetch(`http://localhost:5000/bookmarked/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (const item in data) {
            if (data[item].borderIndex === borderIndex){
              setIsBookmarked(true)
            }
          }
        });
    };
    getBookmarks();
  }, [email, borderIndex, setIsBookmarked]);

  if (crossingData) {
    const currentBorder = crossingData.allMexicanPorts[borderIndex];
    fetchIndividualImage(currentBorder.borderRegion[0]);

    return (
      <Grid
        container
        direction="row"
        style={{ height: "100vh", width: "100vw" }}
        justifyContent="center"
        alignItems="stretch"
      >
        <AccountMenu
          variable={currentBorder}
          sx={{ zIndex: 1000, position: "sticky", top: 0, left: 0 }}
        />
        <Grid
          container
          direction="row"
          style={{ height: "90vh", width: "100vw" }}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={6} sm={8} md={8} Lg={8}>
            <img className="imageUnderlay" src={imageUrl}></img>
            <img className="ImageOverlay" src={imageUrl} />
          </Grid>
          <Grid item xs={6} sm={4} md={4} Lg={4}>
            <Drawer anchor="right" variant="permanent" sx={{ zIndex: 100 }}>
            <Button variant="contained" onClick={() => bookmarkCrossing(borderIndex)} sx={{marginTop:'40px'}}>
  {isBookmarked ? 'Unbookmark' : 'Bookmark'}
</Button>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                align="left"
                display="block"
                margin="30px 5px 0 5px"
              >
                <b>{currentBorder.borderRegion[0]}</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                align="left"
                component="div"
                color="textSecondary"
                fontSize="13px"
                opacity={0.5}
                margin="0px 0 0 5px"
              >
                Pedestrian-Friendly
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                align="left"
                fontSize="13px"
                opacity={0.5}
                margin="10px 0 0 15px"
              >
                {currentBorder.pedestrianLaneWait[0] || 0} minutes Vehicle Wait
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  align="left"
                  fontSize="13px"
                  opacity={0.5}
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
                  fontSize="13px"
                  opacity={0.5}
                  margin="8px 0 0 0"
                >
                  <b>Crossing Name: </b> {currentBorder.crossingName[0]}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  align="left"
                  display="block"
                  margin="8px 0 0 -10px"
                >
                  <b>Details</b>
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  fontSize="13px"
                  opacity={0.5}
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
                  fontSize="13px"
                  opacity={0.5}
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
                  Status:{" "}
                  {currentBorder.portStatus[0] === "Open" ? (
                    <span
                      style={{
                        color: "green",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Open
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      Closed
                    </span>
                  )}
                </Typography>
              </Typography>
              <APIProvider apiKey={apiKey}>
                <div
                  style={{
                    height: "30vh",
                    width: "30vh",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  <Map zoom={10} center={coordinates}></Map>
                </div>
              </APIProvider>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  width: "240px",
                  marginLeft: "30px",
                  fontSize: "13px",
                }}
              >
                {address}
              </div>
            </Drawer>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: "100vh", width: "100vw" }}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={12} md={6} Lg={7}>
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 460,
                  bgcolor: "background.paper",
                  marginLeft: "30px",
                  marginTop: "30px",
                }}
              >
                Comments
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
              </List>{" "}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} Lg={5}>
            <form
              onSubmit={(input) => submit(input)}
              sx={{ marginLeft: "30px", marginTop: "30px" }}
            >
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
      </Grid>
    );
  } else {
    return (
      <ClipLoader
        color="#1877F2"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
}
export default BorderPage;
