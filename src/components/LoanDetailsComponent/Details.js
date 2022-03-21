import React from "react";
import { Box, Typography } from "@mui/material";

const Details = ({ loan }) => {
    console.log(loan.payments);
    
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
                Amount to be Paid:{" "}
                {dollarIndianLocale.format(loan?.amount_to_be_paid)}
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
            <table>
                <thead>
                    <tr>
                    {loan.payments.map((payment, index) => (
                            <>
                            {(new Date(loan.opening_date)).addDays(index) <= new Date() && (
                            <th style={{
                              border: "1px solid black",
                              padding: "5px",
                            }} key={index}>{(new Date(loan.opening_date)).addDays(index).toLocaleString().slice(0, 10)}</th>)}
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {loan.payments.map((payment, index) => (
                            <>
                            {(new Date(loan.opening_date)).addDays(index) <= new Date() && (
                            <td style={{
                              border: "1px solid black",
                              padding: "5px",
                              textAlign: "right",
                            }}  key={index}>{dollarIndianLocale.format(payment)}</td>)}
                            </>
                        ))}
                    </tr>
                </tbody>
            </table>
        </Box>
    );
};

export default Details;
