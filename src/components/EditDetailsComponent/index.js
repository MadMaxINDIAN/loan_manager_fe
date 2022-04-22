import React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
const EditDetails = (props) => {
  const [srNo, setSrNo] = React.useState();
  const [loan, setLoan] = React.useState();
  const [input, setInput] = React.useState({
    name: loan?.borrower_id?.name,
    contact: loan?.borrower_id?.contact,
    aadhar: loan?.borrower_id?.aadhar,
    occupation: loan?.borrower_id?.occupation,
    opening_date: loan?.borrower_id?.opening_date,
    sr_no: loan?.sr_no,
    old_name: loan?.borrower_id?.name,
    old_aaadhar: loan?.borrower_id?.aadhar,
    old_sr_no: loan?.sr_no,
  });
  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleSubmit = async () => {
    props.addLoader();
    try {
      const res = await axios.get(
        `https://kfc-test.herokuapp.com/loan/get/sr_no/${srNo}`,
        config
      );
      setLoan(res.data.loan);
      setInput({
        name: res.data.loan?.borrower_id?.name || "",
        contact: res.data.loan?.borrower_id?.contact || "",
        aadhar: res.data.loan?.borrower_id?.aadhar || "",
        occupation: res.data.loan?.borrower_id?.occupation || "",
        opening_date: new Date(res.data.loan?.opening_date),
        loan_amount: res.data.loan?.loan_amount || "",
        sr_no: res.data.loan?.sr_no || "",
        loan_period: res.data.loan?.loan_period || "",
        old_name: res.data.loan?.borrower_id?.name,
        old_aaadhar: res.data.loan?.borrower_id?.aadhar,
        old_sr_no: res.data.loan?.sr_no,
      });
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(
        err?.response?.data?.message || "Couldn't fetch details",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  };

  const handleUpdate = async () => {
    props.addLoader();
    try {
      const res = await axios.post(
        `https://kfc-test.herokuapp.com/borrower/update/`,
        input,
        config
      );
      const res1 = await axios.post(
        `https://kfc-test.herokuapp.com/loan/update/`,
        input,
        config
      );
      props.removeLoader();
      enqueueSnackbar("Details updated", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(
        err?.response?.data?.message || "Couldn't update details",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  };

  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Edit Details
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={10} lg={8}>
          <TextField
            id="sr_no"
            fullWidth
            name="sr_no"
            placeholder="Sr. No."
            variant="outlined"
            label="Sr. No."
            onChange={(e) => setSrNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2} lg={4}>
          <Button variant="contained" onClick={handleSubmit}>
            Go
          </Button>
        </Grid>
      </Grid>
      {loan && (
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              id="name"
              value={input.name}
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
              value={input.contact}
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
              value={input.occupation}
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
              value={input.aadhar}
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
              value={input.sr_no}
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
              disabled
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                console.log(date);
                setInput({ ...input, opening_date: date });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              id="loan_amount"
              name="loan_amount"
              value={loan.loan_amount}
              placeholder="Loan Amount"
              variant="outlined"
              label="Loan Amount"
              fullWidth
              disabled
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              id="loan_period"
              name="loan_period"
              value={loan.loan_period}
              placeholder="Loan Period"
              variant="outlined"
              label="Loan Period"
              disabled
              fullWidth
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleUpdate} variant="contained" fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default connect((state) => ({ auth: state.auth }), {
  addLoader,
  removeLoader,
})(EditDetails);
