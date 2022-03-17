import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import DataGrid from "../DataGrid";
import axios from "axios";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEntryComponent = () => {
  const [name, setName] = useState();
  const [borrowers, setBorrowers] = useState([]);
  const [borrower, setBorrower] = useState();
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (name) => {
    axios
      .get(`http://localhost:5000/borrower/get?search=${name}`)
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
    axios
      .get(`http://localhost:5000/borrower/get/${borrower._id}`)
      .then((res) => {
        setBorrower(res.data);
        setBorrowers([]);
      })
      .catch((err) => {
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
          {borrowers.map((borrower, index) => (
            <Box
              key={index}
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
                {borrower.address}
              </Typography>
              <Typography noWrap component="div" my={2}>
                {borrower.contact}
              </Typography>
              <Typography noWrap component="div" my={2}>
                {borrower.occupation}
              </Typography>
              <Typography noWrap component="div" my={2}>
                {borrower.aadhar.match(/.{1,4}/g).join(" ")}
              </Typography>
            </Box>
          ))}
        </Box>
      </center>
      {borrower && (
        <Box>
          <Typography noWrap component="div" my={2}>
            Name: {borrower.borrower.name}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Address: {borrower.borrower.address}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Contact: {borrower.borrower.contact}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Occupation: {borrower.borrower.occupation}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Aadhar No.: {borrower.borrower.aadhar.match(/.{1,4}/g).join(" ")}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Loans:
          </Typography>
          {borrower.loans.map((loan, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #e0e0e0",
                padding: "0 15px",
                margin: "2px 0",
              }}
            >
              <Typography noWrap component="div" my={1}>
                {loan.sr_no}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.opening_date.split("T")[0].split("-").reverse().join("/")}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.loan_amount}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.amount_to_be_paid}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.daily_payment}
              </Typography>
              <Typography noWrap component="div" my={1}>
                <DatePicker
                  selected={date}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setDate(date)}
                />
              </Typography>
              <TextField
                id="amount"
                name="amount"
                placeholder="Amount"
                size="small"
                onChange={(amount) => setAmount(amount)}
              />
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default NewEntryComponent;
