import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import { useSnackbar } from "notistack";
import LoansList from "./LoansList";
import { Box, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DashboardComponent = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loans, setLoans] = useState([]);
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleSubmit = async () => {
    if (fromDate > toDate) {
      enqueueSnackbar("From date should be less than or equal to To date", {
        variant: "error",
        autoHideDuration: 3000,
      });
      props.removeLoader();
      return;
    }
    try {
      props.addLoader();
      const res = await axios.post(
        `https://kfc-test.herokuapp.com/loan/get/dates`,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        config
      );
      setLoans(res.data.loans);
      props.removeLoader();
    } catch (error) {
      props.removeLoader();
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(async () => {
    props.addLoader();
    try {
      const result = await axios.get(
        "https://kfc-test.herokuapp.com/loan/get",
        config
      );
      setLoans(result.data.loans);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(err?.response?.data?.message || "Couldn't fetch loans", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }, []);
  return (
    <>
      <Box
        mt={7}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <DatePicker
          selected={fromDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setFromDate(date)}
        />
        <DatePicker
          selected={toDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setToDate(date)}
        />
        <Button variant="contained" size="small" onClick={handleSubmit}>
          Go
        </Button>
      </Box>
      <LoansList loans={loans} />
    </>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(DashboardComponent);
