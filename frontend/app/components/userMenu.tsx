"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import axios from "axios";
import UserDetailsDialog from "../userProfile/page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AccountMenu: React.FC<any> = (props) => {
  const { test, userId } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [userData, setUserData] = useState<any>(null);
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`https://joblisting-4tpk.onrender.com/api/user/${userId}`)
      .then((response) => {
        // Handle successful response
        console.log("Response data:", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (resource not found)
          console.error("Resource not found:", error.response.data);
        } else {
          // Handle other errors
          console.error("An error occurred:", error.message);
        }
      });
  }, [userId]);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic
    test();
    handleClose();
    window.location.href = "/home";
  };
  const handleMyAccountClick = () => {
    setShowUserDetailsDialog(true);
    handleClose();
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon
              sx={{
                width: 32,
                height: 32,
                marginTop: 1.1,
                // backgroundColor: "rgb(25, 118, 210)",
                color: "rgb(25, 118, 210)",
                marginRight: "10px",
                marginLeft: "-10px",
              }}
            >
              {userData && userData.username ? userData.username.charAt(0) : ""}
            </AccountCircleIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
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
            "&:before": {
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
        <MenuItem onClick={handleMyAccountClick}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {userData && (
        <UserDetailsDialog
          userData={userData}
          onClose={() => setShowUserDetailsDialog(false)}
          open={showUserDetailsDialog}
        />
      )}
    </React.Fragment>
  );
};

export default AccountMenu;
