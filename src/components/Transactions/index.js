import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import List from "./List";
import axios from "axios";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEntryComponent = (props) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const { enqueueSnackbar } = useSnackbar();
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const getTransactions = async () => {
    props.addLoader();
    try {
      const response = await axios.post(
        `https://kalawati-finance-company.herokuapp.com/transaction/get/dates`,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        config
      );
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
      props.removeLoader();
    } catch (e) {
      setTransactions([]);
      props.removeLoader();
      enqueueSnackbar(e?.response?.data?.message || "Some error occured", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div
      style={{
        marginTop: "4em",
      }}
    >
      <Typography variant="h6" color="GrayText" noWrap component="div" my={2}>
        Transactions
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
              selected={fromDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setFromDate(date)}
            />

            <DatePicker
              selected={toDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setToDate(date)}
            />
            <Button variant="contained" size="small" onClick={getTransactions}>
              Search
            </Button>
          </Box>
        </Box>
        {transactions?.length > 0 ? (
          <>
            <List transactions={transactions} total={total} />
            <Typography
              style={{
                fontSize: "25px",
                textAlign: "right",
                padding: "15px",
                backgroundColor: "#ddd",
                color: "#222",
              }}
            >
              Total: {dollarIndianLocale.format(total)}
            </Typography>
          </>
        ) : (
          <div style={{ marginTop: "30px" }}>
            <Typography>Select dates to see transactions</Typography>
          </div>
        )}
      </center>
    </div>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(NewEntryComponent);
