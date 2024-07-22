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

function UserProfile() {
  const { userEmail, userName, userImg, userId } = useContext(ApplicationContext);
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("image", file);
    formData.set("caption", caption);
    const response = await fetch("http://localhost:5000/userprofile", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.json();
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };


  useEffect(() => {
    fetch("http://localhost:5000/usersposts")
      .then((response) => response.json())
      .then((data) => {
        let relevantComments = [];
        for (const item in data) {
          if (data[item].userId == userEmail) {
            relevantComments.push(data[item]);
          }
        }
        setComments(relevantComments);
      });
  }, []);

  if (userEmail.length > 0) {
    return (
      <div>
        <AccountMenu variable={userEmail} />
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ padding: "50px" }}>
            <Card sx={{ maxWidth: 400 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={userImg}
                  alt="user google photo"
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
                <ListItem divider={true} alignItems="flex-start" key={index}>
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

          <Grid xs={12}>
            <form
              onSubmit={submit}
              style={{ width: 650 }}
              className="flex flex-col space-y-5 px-5 py-14"
            >
              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
              ></input>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                placeholder="Caption"
              ></input>
              <button type="submit">Submit</button>
            </form>
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
