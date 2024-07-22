import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/newHeader";
import ApplicationContext from "../applicationContext";
import { cardImages } from "./boardImages";
import {
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Grid,
} from "@mui/material";

function Home() {
  const { userEmail } = useContext(ApplicationContext);
  const [readyData, setReadyData] = useState([]);
  let allMexicanBorders = [];
  const navigate = useNavigate();
  const userId = userEmail;

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
  }, [setReadyData]);

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <Grid md={3} wrap="wrap" padding={2}>
          <CardMedia
            component="img"
            height="250"
            image={cardImages[item].image}
            alt="user google photo"
            sx={{
              borderRadius: "10px",
              paddingBottom: "20px",
              borderBottomRightRadius: "30px",
              borderBottomLeftRadius: "30px",
            }}
          />
          <Card
            md={{ maxWidth: 300, maxHeight: 300 }}
            key={item}
            onClick={() => crossingClick(item)}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {currBorder.borderRegion[0]}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  {currBorder.crossingName[0]}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={
                    currBorder.portStatus[0] === "Open"
                      ? { color: "green", fontSize: "1.2rem" }
                      : { color: "red", fontSize: "1.2rem" }
                  }
                >
                  {currBorder.portStatus[0] === "Open"
                    ? "Port is Open"
                    : "Port is Closed"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }
  };

  loadBorderInfo(readyData);

  const crossingClick = (currBorder) => {
    navigate(`/borderpage/${currBorder}`);
  };

  if (allMexicanBorders.length > 0) {
    return (
      <div className="container">
        <AccountMenu variable={userId} />
        <Grid container spacing={2}>
          <Grid
            container
            spacing={2}
            wrap="wrap"
            xs={12}
            sx={{ padding: "0px" }}
          >
            {allMexicanBorders}
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ padding: "80px" }} align="left">
          <div>Last Updated Date: {readyData.lastUpdatedDate}</div>
          <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
        </Grid>
        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default Home;
