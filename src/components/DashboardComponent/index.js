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

const DashboardComponent = (props) => {
  const [fiscalYears, setFiscalYears] = React.useState([]);
  const [selectedFiscalYear, setSelectedFiscalYear] = React.useState("");
  const [totalInvested, setTotalInvested] = React.useState(0);
  const [totalReceived, setTotalReceived] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [amount_to_be_paid, setAmountToBePaid] = React.useState(0);
  const [seven, setSeven] = React.useState(0);
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  useEffect(async () => {
    props.addLoader();
    try {
      const res = await axios.get("http://localhost:5000/summary/");
      setFiscalYears(res.data.summary);
      setAmountToBePaid(res.data.amount_to_be_paid);
      setSelectedFiscalYear(res.data.summary.length - 1);
      const res1 = await axios.get("http://localhost:5000/summary/seven");
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
      console.log(seven);
      props.removeLoader();
    } catch (err) {
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
    try {
      const response = await axios.post(`http://localhost:5000/summary/daily`, {
        date,
      });
      setTotalInvested(response.data.total_investment || 0);
      setTotalReceived(response.data.total_received || 0);
    } catch (err) {
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
        <Grid item lg={12}>
          <FormControl fullWidth variant={"standard"}>
            <InputLabel id="demo-simple-select-label">Fiscal Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedFiscalYear}
              label="Fiscal Year"
              onChange={(e) => {
                setSelectedFiscalYear(e.target.value);
              }}
            >
              {fiscalYears.map((year, index) => (
                <MenuItem key={index} value={index}>
                  {year.fin_year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <Box style={{}}>
            <Typography variant="h6">Fiscal Year</Typography>
            <Typography variant="p">
              {fiscalYears[selectedFiscalYear]?.fin_year}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Investment Amount</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(
                fiscalYears[selectedFiscalYear]?.amount_invested
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Received Amount</Typography>
            <Typography variant="p">
              {dollarIndianLocale.format(
                fiscalYears[selectedFiscalYear]?.amount_taken
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Amount Receivable</Typography>
            <Typography variant="body1">as of today</Typography>
            <Typography variant="p">
              {amount_to_be_paid
                ? dollarIndianLocale.format(amount_to_be_paid)
                : "0"}
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
        <Grid item lg={3}>
          <DatePicker
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setDate(date)}
          />
        </Grid>
        <Grid item lg={3}>
          <Button size="small" variant="contained" onClick={handleSubmit}>
            Go
          </Button>
        </Grid>
        <Grid item lg={3}>
          <Box>
            <Typography variant="h6">Investment Amount</Typography>
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
      </Grid>
    </div>
  );
};

export default connect(() => ({}), { addLoader, removeLoader })(
  DashboardComponent
);
