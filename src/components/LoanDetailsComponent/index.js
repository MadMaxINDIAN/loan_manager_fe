import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  addLoader,
  removeLoader,
} from "../../redux/services/actions/loaderActions";
import { useSnackbar } from "notistack";
import Details from "./Details";

const LoanDetails = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loan, setLoan] = useState();
  useEffect(async () => {
    props.addLoader();
    try {
      const res = await axios.get(`http://localhost:5000/loan/get/${id}`);
      setLoan(res.data.loan);
      props.removeLoader();
    } catch (err) {
      props.removeLoader();
      enqueueSnackbar(err?.response?.data?.message || "Couldn't fetch loan", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }, []);
  const { id } = useParams();
  return <>{loan && <Details loan={loan} />}</>;
};

export default connect(() => ({}), { addLoader, removeLoader })(LoanDetails);
