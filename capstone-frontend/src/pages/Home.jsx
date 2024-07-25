import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "./boardImages";
import "./Home.css";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/newHeader";
import ApplicationContext from "../applicationContext";
import { Grid, Paper, InputBase, Divider, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Search";
import ClipLoader from "react-spinners/ClipLoader";
import ApplicationFooter from "../components/newFooter";

function Home() {
  const { userEmail } = useContext(ApplicationContext);
  const [readyData, setReadyData] = useState([]);
  let allMexicanBorders = [];
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        <div key={item}wrap="wrap"padding={0.5}onClick={() => crossingClick(item)} className="borderCard">
          <img
            src={cardImages[item].image}
            height="250"
            weight="250"
            alt="Border Crossing Image"
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              width: "230px",
            }}
          />
          <div>
          <b className="borderMainTitle">{currBorder.crossingName[0] || (currBorder.borderRegion[0] && <b className="borderSubTitle">{currBorder.borderRegion[0]}</b>)}</b>
          <p style={{ opacity: 0.5 }} className="borderSubTitle"> {currBorder.borderRegion[0]} </p>
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
        </div>
      );
    }
  };

  loadBorderInfo(readyData);

  const crossingClick = (currBorder) => {
    navigate(`/borderpage/${currBorder}`);
  };

  if (allMexicanBorders.length > 0) {
    return (
      <div>
        <AccountMenu variable={userEmail} />
        
        <Grid md={12} container className="container">
          <Grid item xs={12} sm={12}>
            <Paper
              component="form"
              className="Paper"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width:"20vw", 
                height:40
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
        </Grid>
        <Grid container  wrap="wrap" xs={12} sx={{ marginTop:'10px', justifyContent:'center' }}>
        <Grid item  xs={12} >
          <b className="cardSectionHeader">Border Crossings</b>
          </Grid>
          {allMexicanBorders}
        </Grid>
        <Grid xs={12} >
          <div style={{ fontSize: "12px", marginTop:"40px" }}>
            Last Updated Date: {readyData.lastUpdatedDate}
          </div>
          <div style={{ fontSize: "12px", marginBottom: "20px" }} classname="borderPageUpdateTimes">
            Last Updated Time: {readyData.lastUpdatedTime}
          </div>
        </Grid>
        <ModalPopulate />
        <ApplicationFooter/>
      </div>
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
export default Home;
