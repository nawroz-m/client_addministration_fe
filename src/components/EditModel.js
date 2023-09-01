import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Padding } from "@mui/icons-material";
import { LOCALSTORAGECONSTANT } from "../constant/constant";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflow: "auto",

  boxShadow: 24,
  p: 4,
};

const EditModel = (props) => {
  const userInfo = props && props.userInfo;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userData, setUserData] = useState({
    firstname: userInfo && userInfo.firstname,
    lastname: userInfo && userInfo.lastname,
    email: userInfo && userInfo.email,
    telephone: userInfo && userInfo.telephone,
    city: userInfo && userInfo.postaladdress.city,
    street: userInfo && userInfo.postaladdress.street,
    country: userInfo && userInfo.postaladdress.country,
    postalcode: userInfo && userInfo.postaladdress.postalcode,
  });

  const onChangeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem(LOCALSTORAGECONSTANT.ACCESSTOKEN);

  const editHandler = async (event) => {
    event.preventDefault();
    const userEditInfo = {
      id: userInfo && userInfo._id.toString(),
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      telephone: parseInt(userData.telephone),
      postaladdress: {
        city: userData.city,
        street: userData.street,
        country: userData.country,
        postalcode: parseInt(userData.postalcode),
      },
    };

    const response = await axios.put(
      "http://localhost:8090/api/update",
      userEditInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response && response.statusText === "OK" && response.data) {
      window.location.reload();
    }
  };

  return (
    <>
      <IconButton type="button" sx={{ p: "10px" }} onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} fullWidth onClose={handleClose} sx={{ p: 2 }}>
        <Box sx={{ px: 5, py: 1 }}>
          {/* <Box sx={style}> */}
          <TextField
            margin="normal"
            required
            id="firstname"
            label="First Name "
            name="firstname"
            fullWidth
            autoComplete="firstname"
            autoFocus
            // defaultValue={userData.firstname}
            value={userData.firstname}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Last Name"
            id="lastname"
            value={userData.lastname}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={userData.email}
            onChange={onChangeUserData}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="telephone"
            label="Telephone "
            name="telephone"
            autoComplete="telephone"
            type="number"
            defaultValue={userData.telephone}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="street"
            label="Street"
            id="street"
            defaultValue={userData.street}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="city"
            autoFocus
            defaultValue={userData.city}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="country"
            label="Country"
            id="country"
            defaultValue={userData.country}
            onChange={onChangeUserData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="postalcode"
            label="Postalcode"
            name="postalcode"
            autoComplete="postalcode"
            type="number"
            autoFocus
            defaultValue={userData.postalcode}
            onChange={onChangeUserData}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={editHandler}
          >
            Edit
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default EditModel;
