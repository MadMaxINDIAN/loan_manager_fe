import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import BorrowerDetails from "./BorrowerDetails";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEntryComponent = (props) => {
  const [name, setName] = useState();
  const [borrowers, setBorrowers] = useState([]);
  const [borrower, setBorrower] = useState();
  const [date, setDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleChange = (name) => {
    setBorrower();
    if (!name) {
      return setBorrowers([]);
    }
    axios
      .get(`http://localhost:5000/borrower/get?search=${name}`, config)
      .then((response) => {
        setBorrowers(response.data.borrowers);
      })
      .catch((error) => {
        enqueueSnackbar("Could not fetch borrowers", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };
  const handleClick = async (borrower) => {
    props.addLoader();
    axios
      .get(`http://localhost:5000/borrower/get/${borrower._id}`, config)
      .then((res) => {
        setBorrower(res.data);
        setBorrowers([]);
        props.removeLoader();
      })
      .catch((err) => {
        props.removeLoader();
        enqueueSnackbar("Could not fetch borrower", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div
      style={{
        marginTop: "4em",
      }}
    >
      <Typography variant="h6" color="GrayText" noWrap component="div" my={2}>
        New Entry
      </Typography>
      <center>
        <Box
          sx={{ flexGrow: 1 }}
          style={{
            maxWidth: "700px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DatePicker
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setDate(date)}
            />
            <TextField
              id="name"
              name="name"
              placeholder="Name"
              variant="outlined"
              label="Name"
              fullWidth
              style={{
                marginBottom: "1em",
              }}
              onChange={(e) => handleChange(e.target.value)}
            />
          </Box>
          {borrowers.map((borrower, index) => (
            <Box key={index}>
              <Box
                className="hover_black"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "15px",
                  border: "2px solid #e0e0e0",
                  padding: "0 15px",
                  margin: "2px 0",
                }}
                onClick={() => handleClick(borrower)}
              >
                <Typography noWrap component="div" my={2}>
                  {borrower.name}
                </Typography>
                <Typography noWrap component="div" my={2}>
                  {borrower.contact}
                </Typography>
                <Typography noWrap component="div" my={2}>
                  {borrower.occupation}
                </Typography>
                <Typography noWrap component="div" my={2}>
                  {borrower?.aadhar
                    ? borrower?.aadhar?.match(/.{1,4}/g)?.join(" ")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </center>
      {borrower && (
        <BorrowerDetails
          borrower={borrower}
          setBorrower={setBorrower}
          date={date}
        />
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(NewEntryComponent);
