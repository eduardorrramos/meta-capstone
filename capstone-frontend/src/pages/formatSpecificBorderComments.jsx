import {
    ListItemAvatar,
    Typography,
    ListItem,
    Divider,
    Avatar,
    ListItemText,
  } from "@mui/material";
import React from "react";

export default function formatSpecificBorderComments(relevantComments) {
    const formattedComments = relevantComments.map((item, index) => (
        <ListItem divider={true} key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="wafwafwafwafw.com" />
          </ListItemAvatar>
          <ListItemText
            primary={`${item.userId}`}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.userInput}
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.postDate}
                  {item.postTime}
                </Typography>
              </React.Fragment>
            }
          />
          <Divider variant="inset" component="li" />
        </ListItem>
      ))
      return formattedComments;
    };
    