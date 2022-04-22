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
  const today = new Date();
  today.setHours(5, 30, 0, 0);
  const { borrower, setBorrower } = props;
  const [amount, setAmount] = useState();
  const { enqueueSnackbar } = useSnackbar();
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const handleBadDebt = async (loan_id) => {
    props.addLoader();
    await axios
      .post(
        `https://kfc-test.herokuapp.com/transaction/badDebt/${loan_id}`,
        config
      )
      .then((res) => {
        props.removeLoader();
        setBorrower(res.data);
        enqueueSnackbar("Added to Bad Debt", {
          variant: "success",
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        props.removeLoader();
        enqueueSnackbar("Could not add bad debt", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const handleSubmit = async (id) => {
    props.addLoader();
    const data = {
      date: props.date,
      amount: amount,
      user: props?.auth?.user?.username,
    };
    try {
      const res = await axios.post(
        `https://kfc-test.herokuapp.com/transaction/${id}/add`,
        data,
        config
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
        Contact: {borrower?.borrower?.contact}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Occupation: {borrower?.borrower?.occupation}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Aadhar No.:{" "}
        {borrower?.borrower?.aadhar
          ? borrower?.borrower?.aadhar?.match(/.{1,4}/g)?.join(" ")
          : "-"}
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
              {loan.status === "bad debt" ? (
                <Typography color="red">BAD DEBT</Typography>
              ) : loan.status === "closed" ? (
                <Typography color="green">CLOSED</Typography>
              ) : (
                Math.floor(
                  (new Date(loan.opening_date)
                    .addDays(loan.loan_period)
                    .getTime() -
                    today.getTime()) /
                    (1000 * 3600 * 24)
                )
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {Math.floor(
              (new Date(loan.opening_date).addDays(loan.loan_period).getTime() -
                today.getTime()) /
                (1000 * 3600 * 24)
            ) < 0 &&
              loan.status !== "bad debt" && (
                <Box display="flex" justifyContent="flex-end" m={2}>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleBadDebt(loan._id)}
                  >
                    Bad Debt
                  </Button>
                </Box>
              )}
            {loan.status === "active" && (
              <Box display="flex" justifyContent="flex-end" m={2}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleSubmit(loan._id)}
                >
                  Add entry
                </Button>
              </Box>
            )}
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(BorrowerDetails);
