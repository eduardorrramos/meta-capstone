import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import "./header.css";
import Logout from "./logout";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userImg = sessionStorage.getItem("image");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userProfileClick = () => {
    navigate(`/userprofile`);
  };

  return (
    <React.Fragment>
      <nav
        className="nav-bar"
        style={{
          height: "60px",
          backgroundColor: "#FEFDFD",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div
          className="home-faq"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="homeIcon"
            style={{ marginRight: "90px", marginTop: "12px" }}
          >
            <a href={`http://localhost:5173/home`}>
              {" "}
              <img
                src={"../src/components/png/newHomeIcon.png"}
                alt="Home"
                style={{ height: "30px" }}
              />
            </a>
          </div>
          <div className="faqIcon" style={{ marginTop: "21px" }}>
            <a href={`http://localhost:5173/faq`}>
              {" "}
              <img
                src={"../src/components/png/newQuestionIcon.png"}
                alt="Home"
                style={{ height: "23px" }}
              />
            </a>
          </div>
        </div>

        <div
          className="avatar"
          style={{ position: "absolute", top: 7, right: 15 }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 34, height: 34 }} src={userImg}></Avatar>
            </IconButton>
          </Tooltip>
        </div>
      </nav>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              zIndex: 1000,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 1000,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            userProfileClick();
          }}
        >
          <Avatar src={userImg} /> Profile
        </MenuItem>
        <Divider />
        <Logout />
      </Menu>
    </React.Fragment>
  );
}
