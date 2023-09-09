import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "@/app/login/page";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

const LoginPopup: React.FC<any> = (props) => {
  const { test, onLoginSuccess } = props;
  // console.log(test);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginSuccess = (userId: string) => {
    // Call the onLogin callback to pass the userId up to the parent component
    console.log("Received user ID:", userId);
    onLoginSuccess(userId);
  };
  return (
    <>
      <Button onClick={handleClickOpen}>Login</Button>
      <StyledDialog onClose={handleClose} open={open}>
        <DialogTitle>Welcome back to JobPuzzlePro</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <LoginForm test={test} onLoginSuccess={handleLoginSuccess} />
        </DialogContent>
      </StyledDialog>
    </>
  );
};
export default LoginPopup;
