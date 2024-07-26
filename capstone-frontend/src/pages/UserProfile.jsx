import { useEffect, useState, useContext } from "react";
import AccountMenu from "../components/newHeader";
import Logout from "../components/logout";
import ModalPopulate from "../components/modal";
import React from "react";
import ApplicationContext from "../applicationContext";
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
import ClipLoader from "react-spinners/ClipLoader";
import './UserProfile.css';
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { userEmail, userName, userImg, userId } = useContext(ApplicationContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/userprofile/${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  if (userEmail.length > 0) {
    return (
      <div>
        <AccountMenu className="AccountMenu"  variable={userEmail} />
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <Card sx={{ maxWidth: 300 }}>
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

          <Grid xs={6}>
            <List
              sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}
            >
              {comments.map((item, index) => (
                <ListItem divider={true} alignItems="flex-start" key={index} >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={userImg} />
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
                        {userName} - {`${item.userInput}`} -{" "}
                        {item.postTime}, {item.postDate}
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <ModalPopulate />
      </div>
    );
  } else {
    return (<ClipLoader
      color="#1877F2"
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />);
  }
}
export default UserProfile;
