import * as React from "react";
import {
  Typography,
  Tooltip,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../applicationContext";
export default function AccountMenu(props) {
  const { userEmail, userName, userImg, userId } = useContext(ApplicationContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center",  marginBottom: '40px' }}>
        <Typography sx={{ minWidth: 100 }}>
          {" "}
          <a
            href={`http://localhost:5173/home`}
            style={{ transform: "translateY(100%)" }}
          >
            Home
          </a>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          {" "}
          <a
            href={`http://localhost:5173/emergencycontact`}
            style={{ transform: "translateY(100%)" }}
          >
            Emergency Contact
          </a>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          {" "}
          <a
            href={`http://localhost:5173/faq`}
            style={{ transform: "translateY(100%)" }}
          >
            FAQ
          </a>
        </Typography>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={userImg}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>

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
<MenuItem onClick={() => { handleClose(); userProfileClick(); }}>
          <Avatar src={userImg} /> Profile
        </MenuItem>
   
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
