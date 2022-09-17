import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import Graph from "./Graph";
import { BASE_URL_1 } from "../../constants/urls";

const DashboardComponent = (props) => {
  const [summary, setSummary] = React.useState();
  const [amountReceivable, setAmountReceivable] = React.useState(0);
  const [totalInvested, setTotalInvested] = React.useState(0);
  const [totalReceived, setTotalReceived] = React.useState(0);
  const [totalInvestment, setTotalInvestment] = React.useState(0)
  const [totalWithdrawal, setTotalWithdrawal] = React.useState(0)
  const [totalLoanAmount, setTotalLoanAmount] = React.useState(0)
  const [totalRecievedNow, setTotalRecievedNow] = React.useState(0)
  const [investmentDate, setInvestmentDate] = React.useState(0)
  const [withdrawalDate, setWithdrawalDate] = React.useState(0)
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [amount_to_be_paid, setAmountToBePaid] = React.useState(0);
  const [seven, setSeven] = React.useState(0);
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
  const cashInHand = +totalInvestment + +totalRecievedNow - +totalLoanAmount - +totalWithdrawal

  useEffect(async () => {
    props.addLoader();
    try {
      const res = await axios.get(`${BASE_URL_1}/summary/`, config);
      setAmountToBePaid(res.data.amount_to_be_paid || 0);
      setAmountReceivable(res.data.amount_receivable || 0);
      setSummary(res.data.summary);
      const res1 = await axios.get(
        `${BASE_URL_1}/summary/seven`,
        config
      );
      const sevendata = [];
      const loans = [];
      const transactions = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        var loan = 0;
        for (let j = 0; j < res1.data.loans.length; j++) {
          if (
            res1.data.loans[j]._id.slice(0, 10) === date.toJSON().slice(0, 10)
          ) {
            loan += res1.data.loans[j].total;
            break;
          }
        }
        loans.push([7 - i - 1, loan]);
        var transaction = 0;
        for (let j = 0; j < res1.data.transactions.length; j++) {
          if (
            res1.data.transactions[j]._id.slice(0, 10) ===
            date.toJSON().slice(0, 10)
          ) {
            transaction += res1.data.transactions[j].total;
            break;
          }
        }
        transactions.push([7 - i - 1, transaction]);
        const data = {
          date,
          loan,
          transactions: transaction,
        };
        sevendata.push(data);
      }
      setSeven([
        {
          label: "Loans",
          data: loans,
        },
        {
          label: "Transactions",
          data: transactions,
        },
      ]);
      const res2 = await axios.post(
        `${BASE_URL_1}/summary/daily`,
        {
          from_date: new Date().toISOString(),
          to_date: new Date().toISOString(),
        },
        config
      );
      setTotalInvested(res2.data.total_investment || 0);
      setTotalReceived(res2.data.total_received || 0);

      const res3 = await axios.get(`${BASE_URL_1}/withdraw/total`, config)
      setTotalInvestment(res3.data.investment || 0)
      setTotalWithdrawal(res3.data.withdrawal || 0)
      const res4 = await axios.post(`${BASE_URL_1}/summary/daily`,
        {
          from_date: new Date('2021-01-01').toISOString(),
          to_date: new Date().toISOString(),
        },
        config
      );
      setTotalLoanAmount(res4.data.total_investment || 0)
      setTotalRecievedNow(res4.data.total_received || 0)

      const res5 = await axios.post(`${BASE_URL_1}/withdraw/total/date`, {
        from_date: new Date().toISOString(),
        to_date: new Date().toISOString(),
      }, config)
      setInvestmentDate(res5.data.investment)
      setWithdrawalDate(res5.data.withdrawal)
      props.removeLoader();
    } catch (err) {
      console.log(err)
      props.removeLoader();
      enqueueSnackbar(
        err?.response?.data?.message || "Couldn't fetch summary",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  }, []);

  const handleSubmit = async () => {
    props.addLoader();
    if (fromDate > toDate) {
      enqueueSnackbar("From date should be less than or equal to To date", {
        variant: "error",
        autoHideDuration: 3000,
      });
      props.removeLoader();
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL_1}/summary/daily`,
        {
          from_date: fromDate,
          to_date: toDate,
        },
        config
      );
      setTotalInvested(response.data.total_investment || 0);
      setTotalReceived(response.data.total_received || 0);

      const res = await axios.post(`${BASE_URL_1}/withdraw/total/date`, {
        from_date: fromDate,
        to_date: toDate,
      }, config)
      setInvestmentDate(res.data.investment)
      setWithdrawalDate(res.data.withdrawal)
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(err?.response?.data?.message || "Something went wrong", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div
      style={{
        marginTop: "4em",
        padding: "2em 0em 0em 2em",
      }}
    >
      <Grid
        container
        spacing={2}
        style={{
          border: "1px solid #e0e0e0",
          padding: "2em",
        }}
      >
        <Grid item xs={12} md={6} lg={3}>
          <Box>
            <Typography variant="h6">Investment Amount</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(summary?.amount_invested)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box>
            <Typography variant="h6">Amount Receivable</Typography>
            <Typography variant="body1">as of today</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(amount_to_be_paid)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box>
            <Typography variant="h6">Amount Receivable</Typography>
            <Typography variant="body1">today</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(amountReceivable)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box>
            <Typography variant="h6">Cash In Hand</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(cashInHand.toString())}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          border: "1px solid #e0e0e0",
          padding: "2em",
          marginTop: "1em",
        }}
        spacing={2}
      >
        <Grid item lg={2.5}>
          <DatePicker
            selected={fromDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setFromDate(date)}
          />
        </Grid>
        <Grid item lg={2.5}>
          <DatePicker
            selected={toDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setToDate(date)}
          />
        </Grid>
        <Grid item lg={2}>
          <Button size="small" variant="contained" onClick={handleSubmit}>
            Go
          </Button>
        </Grid>
        <Grid item lg={5}></Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Total Loan Amount</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(totalInvested)}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Received Amount</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(totalReceived)}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Total Deposit</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(investmentDate)}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Total Withdrawal</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(withdrawalDate)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{
          border: "1px solid #e0e0e0",
          padding: "2em",
          marginTop: "1em",
        }}
      >
        <Grid item lg={8}>
          {seven && <Graph seven={seven} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(DashboardComponent);
