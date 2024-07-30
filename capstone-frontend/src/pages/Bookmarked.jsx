// import "./Bookmarked.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "./boardImages";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/header";
import ApplicationContext from "../applicationContext";
import { Grid, Paper, InputBase, Divider, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Search";
import ClipLoader from "react-spinners/ClipLoader";
import PermanentDrawerLeft from "../components/homeSideBar";

function Bookmarked() {
  const { userEmail } = useContext(ApplicationContext);
  const [readyData, setReadyData] = useState([]);
  let allMexicanBorders = [];
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  let bookmarkedBorders = []
  const [relevantIndex, setRelevantIndex] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/bookmarked/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/usersposts/",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (const item of data) {
          bookmarkedBorders.push(item.borderIndex)
        }
      });

    fetch(`http://localhost:5000/borderdata?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        let relevantBorders = []
        let relevantIndices = []
        setRelevantIndex([])
        for (const item of bookmarkedBorders) {
          console.log(item)
          relevantIndices.push(item)
          relevantBorders.push(data.allMexicanPorts[item])
        }
        setRelevantIndex(relevantIndices)
        data.allMexicanPorts = relevantBorders
        setReadyData(data);
      })
      .catch((err) => console.log(err));

  }, [searchQuery]);

  const bookmarkCrossing = (borderIndex) => {
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
  };

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <div
          key={item}
          wrap="wrap"
          padding={0.5}
          onClick={() => crossingClick(relevantIndex[item])}
          className="borderCard"
        >
          <div>
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
            <b className="borderMainTitle">
              {currBorder.crossingName[0] ||
                (currBorder.borderRegion[0] && (
                  <b className="borderSubTitle">{currBorder.borderRegion[0]}</b>
                ))}
            </b>
            <p style={{ opacity: 0.5 }} className="borderSubTitle">
              {" "}
              {currBorder.borderRegion[0]}{" "}
            </p>
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
        <Grid
          container
          direction="row"
          style={{ height: "100vh", width: "100vw" }}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={6} sm={4} md={2} Lg={2}>
            
            <PermanentDrawerLeft />
            <Paper
              component="form"
              className="Paper"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "200px",
                height: 40,
                top: -10,
                position: "fixed",
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
          <Grid
            item
            // wrap="wrap"
            style={{ marginTop: "60px" }}
            xs={6}
            sm={8}
            md={10}
            Lg={10}
          >
            <Grid
              container
              wrap="wrap"
              xs={12}
              sx={{ marginTop: "10px", justifyContent: "center" }}
            >
              <Grid item xs={12}>
                <b className="cardSectionHeader">Bookmarked Crossings</b>
              </Grid>
              {allMexicanBorders}
            </Grid>
            <div style={{ fontSize: "12px", marginTop: "40px" }}>
              Last Updated Date: {readyData.lastUpdatedDate}
            </div>
            <div
              style={{ fontSize: "12px", marginBottom: "20px" }}
              classname="borderPageUpdateTimes"
            >
              Last Updated Time: {readyData.lastUpdatedTime}
            </div>
          </Grid>
        </Grid>
        <ModalPopulate />
      </Grid>
    );
  } else {
    return (
      // <ClipLoader
      //   color="#1877F2"
      //   loading={loading}
      //   size={150}
      //   aria-label="Loading Spinner"
      //   data-testid="loader"
      // />
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
        <Grid
          container
          direction="row"
          style={{ height: "100vh", width: "100vw" }}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={6} sm={4} md={2} Lg={2}>
            
            <PermanentDrawerLeft />
            <Paper
              component="form"
              className="Paper"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "200px",
                height: 40,
                top: -10,
                position: "fixed",
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
          <Grid
            item
            // wrap="wrap"
            style={{ marginTop: "60px" }}
            xs={6}
            sm={8}
            md={10}
            Lg={10}
          >
            <Grid
              container
              wrap="wrap"
              xs={12}
              sx={{ marginTop: "10px", justifyContent: "center" }}
            >
              <Grid item xs={12}>
                <b className="cardSectionHeader">Bookmarked Crossings</b>
              </Grid>
              <b> Nothing Bookmarked </b>
            </Grid>
            <div style={{ fontSize: "12px", marginTop: "40px" }}>
              Last Updated Date: {readyData.lastUpdatedDate}
            </div>
            <div
              style={{ fontSize: "12px", marginBottom: "20px" }}
              classname="borderPageUpdateTimes"
            >
              Last Updated Time: {readyData.lastUpdatedTime}
            </div>
          </Grid>
        </Grid>
        <ModalPopulate />
      </Grid>
    );
  }
}
export default Bookmarked;
