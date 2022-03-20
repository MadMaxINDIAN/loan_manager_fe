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
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    props.addLoader();
    axios
      .get("http://localhost:5000/summary/")
      .then((res) => {
        setFiscalYears(res.data.summary);
        setSelectedFiscalYear(res.data.summary.length - 1);
        props.removeLoader();
      })
      .catch((err) => {
        props.removeLoader();
        enqueueSnackbar(
          err?.response?.data?.message || "Couldn't fetch summary",
          {
            variant: "error",
            autoHideDuration: 3000,
          }
        );
      });
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
      }}
    >
      <Grid container spacing={5}>
        <Grid item lg={3}>
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
                <MenuItem value={index}>{year.fin_year}</MenuItem>
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
