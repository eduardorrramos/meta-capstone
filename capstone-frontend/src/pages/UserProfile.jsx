import { useEffect, useState, React } from "react";
import AccountMenu from "../components/newHeader";
import Logout from "../components/logout";
import ModalPopulate from "../components/modal";

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
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);
  const userid = sessionStorage.getItem("email");
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
        <AccountMenu variable={userid} />
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
                        {userData[userIndex].name} - {`${item.userInput}`} -{" "}
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
