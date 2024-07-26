import { useEffect, useState, useContext } from "react";
import AccountMenu from "../components/header";
import ModalPopulate from "../components/modal";
import React from "react";
import ApplicationContext from "../applicationContext";
import ClipLoader from "react-spinners/ClipLoader";
import {
  ListItemText,
  CardMedia,
  ListItem,
  List,
  Divider,
  Typography,
  ListItemAvatar,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import "./UserProfile.css";

function UserProfile() {
  const { userEmail, userName, userImg, userId } =
    useContext(ApplicationContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userprofile/${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  if (userEmail.length > 0) {
    return (
      <Grid
        container
        direction="row"
        style={{ height: "100vh", width: "100vw", backgroundColor: "#f0f2f5" }}
        justifyContent="center"
        alignItems="stretch"
      >
        <AccountMenu
          variable={userEmail}
          sx={{ zIndex: 1000, position: "sticky", top: 0, left: 0 }}
        />

        <Grid item xs={6} sm={6} md={6} Lg={6} justifyContent="center">
          <Card sx={{ maxWidth: 300, marginTop: "150px", marginLeft: "15vw" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={userImg}
                alt="User's Google Photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {userName}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Google ID: {userId}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Email: {userEmail}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} Lg={6} sx={{ marginTop: "100px" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 460,
              bgcolor: "background.paper",
              marginLeft: "5vw",
            }}
          >
            <b>Comment History</b>
            {comments.map((item, index) => (
              <ListItem divider={true} alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="User Google Image" src={userImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={`Border Number ${item.borderNum}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      {userName} - {`${item.userInput}`} - {item.postTime},{" "}
                      {item.postDate}
                    </React.Fragment>
                  }
                />
                <Divider variant="inset" component="li" />
              </ListItem>
            ))}
          </List>
        </Grid>

        <ModalPopulate />
      </Grid>
    );
  } else {
    return (
      <ClipLoader
        color="#1877F2"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
}
export default UserProfile;
