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
  const config = {
    headers: {
      Authorization: `Bearer ${props.auth.token}`,
    },
  };
  useEffect(async () => {
    props.addLoader();
    try {
      const res = await axios.get(
        `https://kalawati-finance-company.herokuapp.com/loan/get/${id}`,
        config
      );
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

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  { addLoader, removeLoader }
)(LoanDetails);
