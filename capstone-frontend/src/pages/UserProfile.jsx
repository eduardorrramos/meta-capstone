import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../components/logout";
import ModalPopulate from "../components/modal";
import { Typography } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid"; // Grid version 1
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AccountMenu from "../components/newHeader";

function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);

  const params = useParams();
  const userid = params.userid;

  const fetchUserData = async () => {
    await fetch("http://localhost:5000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  let userIndex = 0;
  for (const item in userData) {
    if (userData[item].email == userid) {
      userIndex = item;
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/usersposts")
      .then((response) => response.json())
      .then((data) => {
        let relevantComments = [];
        for (const item in data) {
          if (data[item].userId == userid) {
            relevantComments.push(data[item]);
          }
        }
        setComments(relevantComments);
      });
  }, []);

  if (userData.length > 0) {
    return (
      <div>
        <AccountMenu variable={userid}/>
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <Card sx={{ maxWidth: 400 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={userData[userIndex].imgUrl}
                  alt="user google photo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {userData[userIndex].name}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Google ID: {userData[userIndex].googleId}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Email: {userData[userIndex].email}
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
                <ListItem divider={true} alignItems="flex-start" key={index}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={userData[userIndex].imgUrl} />
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
                        {userData[userIndex].name} - {`${item.userInput}`}
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid xs={12}>
            <Logout />
          </Grid>
        </Grid>
        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default UserProfile;
