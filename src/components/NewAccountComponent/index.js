import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import "react-datepicker/dist/react-datepicker.css";

const NewAccountComponent = (props) => {
  const [input, setInput] = useState({
    name: "",
    contact: "",
    aadhar: "",
    occupation: "",
    opening_date: new Date(),
    loan_amount: "",
    sr_no: "",
    loan_period: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleSubmit = () => {
    props.addLoader();
    axios
      .post("https://madhuresh-loan-management.herokuapp.com/borrower/add", input, config)
      .then((res) => {
        const borrower_id = res?.data?.borrower?._id;
        input.borrower_id = borrower_id;
        return axios
          .post("https://madhuresh-loan-management.herokuapp.com/loan/add", input, config)
          .then(() => {
            props.removeLoader();
            enqueueSnackbar("Account Created Successfully", {
              variant: "success",
              autoHideDuration: 2000,
            });
          });
      })
      .catch((err) => {
        props.removeLoader();
        const message = err?.response?.data?.data
          ? err?.response?.data?.data[0].msg
          : err?.response?.data?.message;
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} mt={8}>
      <Typography variant="h6" noWrap component="div">
        New Account
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="name"
            name="name"
            placeholder="Name & Address"
            variant="outlined"
            label="Name & Address"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="contact"
            name="contact"
            placeholder="Contact"
            variant="outlined"
            label="Contact"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="occupation"
            name="occupation"
            placeholder="Occupation"
            variant="outlined"
            label="Occupation"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="aadhar"
            name="aadhar"
            placeholder="Aadhar"
            variant="outlined"
            label="Aadhar"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="sr_no"
            name="sr_no"
            placeholder="Sr. No."
            variant="outlined"
            label="Sr. No."
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DatePicker
            selected={input.opening_date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setInput({ ...input, opening_date: date })}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="loan_amount"
            name="loan_amount"
            placeholder="Loan Amount"
            variant="outlined"
            label="Loan Amount"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            id="loan_period"
            name="loan_period"
            placeholder="Loan Period"
            variant="outlined"
            label="Loan Period"
            fullWidth
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(NewAccountComponent);
