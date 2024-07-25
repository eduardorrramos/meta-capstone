import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApplicationContext from "../applicationContext";
import {
  Typography,
  Tooltip,
  Box,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import './newHeader.css';
import Logout from "./logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Search";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const { userImg } = useContext(ApplicationContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
//   const context = useContext(ApplicationContext);
//   context.searchQuery = searchQuery;


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

    <nav className="nav-bar"  style={{  height:'60px', backgroundColor:'#FEFDFD', width:'100%' }}>
    {/* {location.pathname === '/home' && (
        <div className="search-bar">
          
          

        </div>
      )} */}
      
  <div className="home-faq" style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="homeIcon" style={{ marginRight: '90px', marginTop:'19px' }}>
      <a href={`http://localhost:5173/home`}> <img src={'../src/components/homeIcon.png'} alt="Home"  style={{  height:'25px' }}/></a>
    </div>
    <div className="faqIcon" style={{marginTop:'17px'}}>
      <a href={`http://localhost:5173/faq`}>    <img src={'../src/components/randomicon.png'} alt="Home"  style={{  height:'26px' }}/>
      </a>
    </div>
    
  </div>
  
  <div className="avatar" style={{ position: 'absolute', top: 7, right: 15 }}>
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
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
              zIndex: 0,
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

        <Logout/>
      </Menu>
      
</React.Fragment> 

  );
  
}