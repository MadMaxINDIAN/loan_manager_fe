import React from "react";
import { Box, Typography } from "@mui/material";

const Details = ({ loan }) => {
  const today = new Date();
  today.setHours(5, 30, 0, 0);
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

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
        Opening Date:{" "}
        {loan?.opening_date.slice(0, 10).split("-").reverse().join("/")}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Loan Amount: {dollarIndianLocale.format(loan?.loan_amount)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Amount Remaining: {dollarIndianLocale.format(loan?.amount_to_be_paid)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Daily Payment: {dollarIndianLocale.format(loan?.daily_payment)}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Days Remaining:{" "}
        {loan.status === "active"
          ? Math.floor(
              (new Date(loan.opening_date.substr(0, 10))
                .addDays(loan.loan_period)
                .getTime() -
                today.getTime()) /
                (1000 * 3600 * 24)
            )
          : "-"}
      </Typography>
      <Typography noWrap component="div" my={2}>
        Status: {loan?.status}
      </Typography>
      <table>
        <thead>
          <tr>
            {loan.payments.map((payment, index) => (
              <>
                {new Date(loan.opening_date).addDays(index) <= new Date() && (
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                    key={index}
                  >
                    {new Date(loan.opening_date)
                      .addDays(index)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </th>
                )}
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {loan.payments.map((payment, index) => (
              <>
                {new Date(loan.opening_date).addDays(index) <= new Date() && (
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "right",
                    }}
                    key={index}
                  >
                    {dollarIndianLocale.format(payment)}
                  </td>
                )}
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default Details;
