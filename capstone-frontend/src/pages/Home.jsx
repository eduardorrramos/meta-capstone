import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "./boardImages";
import "./Home.css";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/newHeader";
import ApplicationContext from "../applicationContext";
import {Grid, Paper, InputBase, Divider, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Search";

function Home() {
  const { userEmail } = useContext(ApplicationContext);
  const [readyData, setReadyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let allMexicanBorders = [];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/borderdata?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
  }, [searchQuery]);

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <Grid
          md={2.3}
          sm={3.5}
          key={item}
          wrap="wrap"
          padding={0.5}
          onClick={() => crossingClick(item)}
          marginBottom={3}
        >
          <img
            src={cardImages[item].image}
            component="img"
            height="250"
            weight="250"
            alt="user google photo"
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              width: "230px",
            }}
          />
          <div>
            <b className="borderMainTitle">{currBorder.crossingName[0]}</b>
            <p className="borderSubTitle"> {currBorder.borderRegion[0]}</p>
            <div className="borderMainTitle">
              {currBorder.portStatus[0] === "Open" ? (
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
            </div>
          </div>
        </Grid>
      );
    }
  };

  loadBorderInfo(readyData);

  const crossingClick = (currBorder) => {
    navigate(`/borderpage/${currBorder}`);
  };

  if (allMexicanBorders) {
    return (
      <div className="container">
        <Grid xs={12} container>
          <Grid item xs={6}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Migra"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              ></IconButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <AccountMenu variable={userEmail} />
          </Grid>
        </Grid>
        <Grid container spacing={2} wrap="wrap" xs={12} sx={{ padding: "0px" }}>
          {allMexicanBorders}
        </Grid>
        <Grid xs={12}>
          <div style={{ fontSize: "12px" }}>
            Last Updated Date: {readyData.lastUpdatedDate}
          </div>
          <div style={{ fontSize: "12px" }}>
            Last Updated Time: {readyData.lastUpdatedTime}
          </div>
        </Grid>
        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default Home;
