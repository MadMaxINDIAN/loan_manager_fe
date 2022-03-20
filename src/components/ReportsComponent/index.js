import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import { useSnackbar } from "notistack";
import LoansList from "./LoansList";

const DashboardComponent = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loans, setLoans] = useState([]);
  useEffect(async () => {
    props.addLoader();
    try {
      const result = await axios.get("http://localhost:5000/loan/get");
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
  return <LoansList loans={loans} />;
};

export default connect((state) => ({}), { addLoader, removeLoader })(
  DashboardComponent
);
