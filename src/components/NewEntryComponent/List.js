import * as React from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import { BASE_URL_1 } from "../../constants/urls";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const today = new Date();
today.setHours(5, 30, 0, 0);

function Item(props) {

  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const { handleSubmit, borrower } = props;
  return (
    <>
      {borrower?.loans?.map((loan) => {
        const [amount, setAmount] = React.useState("");
        return <Box
          key={loan?._id}
          style={{
            border: "1px solid black",
            margin: "10px 0px 10px 0px",
            padding: "0px 15px",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            color="GrayText"
            noWrap
            component="div"
            my={2}
          >
            {loan?.sr_no}
          </Typography>
          <Typography
            className="loan_account_holder"
            style={{
              width: "200px",
              scrollBehavior: "smooth",
              overflowX: "scroll",
            }}
            variant="body1"
            color="Black"
            component="div"
            my={2}
          >
            {borrower?.name}
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {loan?.opening_date?.slice(0, 10)?.split("-")?.reverse().join("/")}
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {dollarIndianLocale.format(loan?.loan_amount)}
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {dollarIndianLocale.format(loan?.amount_to_be_paid)}
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {dollarIndianLocale.format(loan?.daily_payment)}
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {loan?.loan_period} days
          </Typography>
          <Typography variant="body1" color="Black" noWrap component="div" my={2}>
            {Math.floor(
              (new Date(loan?.opening_date).addDays(loan?.loan_period).getTime() -
                today.getTime()) /
              (1000 * 3600 * 24)
            ) - 1}{" "}
            days
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            value={amount}
            style={{ textAlign: "right" }}
            placeholder="Amount"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit(loan._id, amount)
              }
            }}
          />
          <Button
            size="small"
            onClick={() => {
              handleSubmit(loan._id, amount);
            }}
            variant="contained"
            placeholder="Amount"
          >
            Add entry
          </Button>
        </Box>
      })}
    </>
  );
}

function LoansList(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (id, amount) => {
    props.addLoader();
    const data = {
      date: props.date,
      amount: amount,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${props.auth.token}`,
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL_1}/transaction/${id}/add`,
        data,
        config
      );
      props.setName('')
      props.setBorrowers([])
      props.removeLoader();
      enqueueSnackbar(res?.data?.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.log(err);
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
    <>
      {props?.borrowers?.length > 0 &&
        <div
          style={{
            height: "400px",
            width: "100%",
            marginTop: "20px",
          }}
        >

          <Box
            sx={{
              height: 400,
              minWidth: "900px",
            }}
          >
            {props?.borrowers?.map((borrower, index) => (
              <Item
                borrower={borrower}
                key={index}
                handleSubmit={handleSubmit}
                fetchAgain={props.fetchAgain}
                setFetchAgain={props.setFetchAgain}
              />
            ))}
          </Box>
        </div>
      }
    </>
  );
}

export default connect((state) => {
  return {
    auth: state.auth,
  };
}, null)(LoansList);
