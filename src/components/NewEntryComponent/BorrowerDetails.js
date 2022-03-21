import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";

const BorrowerDetails = (props) => {
  const { borrower, setBorrower } = props;
  const [amount, setAmount] = useState();
  const { enqueueSnackbar } = useSnackbar();
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const handleSubmit = async (id) => {
    props.addLoader();
    const data = {
      date: props.date,
      amount: amount,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/transaction/${id}/add`,
        data
      );
      setBorrower(res.data);
      props.removeLoader();
      enqueueSnackbar(res?.data?.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(
        err?.response?.data?.message || "Could not submit entry",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  };

  return (
    <Box>
      <Typography noWrap component="div" my={2}>
        Name: {borrower?.borrower?.name}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Address: {borrower?.borrower?.address}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Contact: {borrower?.borrower?.contact}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Occupation: {borrower?.borrower?.occupation}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Aadhar No.: {borrower?.borrower?.aadhar?.match(/.{1,4}/g).join(" ")}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Loans:
      </Typography>
      {borrower.loans.map((loan, index) => (
        <Box key={index} mt={2}>
          <Box
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
              {dollarIndianLocale.format(loan.loan_amount)}
            </Typography>
            <Typography noWrap component="div" my={1}>
              {dollarIndianLocale.format(loan.amount_to_be_paid)}
            </Typography>
            <Typography noWrap component="div" my={1}>
              {dollarIndianLocale.format(loan.daily_payment)}
            </Typography>
            <Typography noWrap component="div" my={1}>
              {Math.floor(
                (new Date(loan.opening_date).addDays(60).getTime() -
                  new Date().getTime()) /
                  (1000 * 3600 * 24)
              )}
            </Typography>
            <TextField
              id="amount"
              disabled={loan.status !== "active"}
              name="amount"
              placeholder="Amount"
              size="small"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Box>
          {loan.status === "active" && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSubmit(loan._id)}
              >
                Add entry
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default connect(() => ({}), { addLoader, removeLoader })(
  BorrowerDetails
);
