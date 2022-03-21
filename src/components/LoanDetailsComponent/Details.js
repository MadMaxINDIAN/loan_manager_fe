import React from "react";
import { Box, Typography } from "@mui/material";

const Details = ({ loan }) => {
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  return (
    <Box mt={7}>
      <Typography noWrap component="div" my={2}>
        Sr. No.: {loan?.sr_no}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Name: {loan?.borrower_id?.name}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Address: {loan?.borrower_id?.address}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Opening Date:{" "}
        {loan?.opening_date.slice(0, 10).split("-").reverse().join("/")}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Loan Amount: {dollarIndianLocale.format(loan?.loan_amount)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Amount to be Paid: {dollarIndianLocale.format(loan?.amount_to_be_paid)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Daily Payment: {dollarIndianLocale.format(loan?.daily_payment)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Days Remaining:{" "}
        {Math.floor(
          (new Date(loan.opening_date).addDays(60).getTime() -
            new Date().getTime()) /
            (1000 * 3600 * 24)
        )}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Status: {loan?.status}
      </Typography>
    </Box>
  );
};

export default Details;
