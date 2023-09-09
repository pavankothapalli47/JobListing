import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface UserDetailsDialogProps {
  userData: any;
  onClose: () => void;
  open: boolean;
}
const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  userData,
  onClose,
  open,
}) => {
  console.log("userData:", userData);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <p>FullName: {userData.fullName}</p>
        <p>Email: {userData.email}</p>
        <p>MobileNumber:{userData.mobileNumber}</p>
        <p>Gender:{userData.gender}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
