import { TextField, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { Box } from "@mui/system";
import React from "react";

const BorrowerDetails = (props) => {
    const { borrower, date } = props;
    return (
        <Box>
          <Typography noWrap component="div" my={2}>
            Name: {borrower.borrower.name}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Address: {borrower.borrower.address}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Contact: {borrower.borrower.contact}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Occupation: {borrower.borrower.occupation}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Aadhar No.: {borrower.borrower.aadhar.match(/.{1,4}/g).join(" ")}
          </Typography>
          <Typography noWrap component="div" my={2}>
            Loans:
          </Typography>
          {borrower.loans.map((loan, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #e0e0e0",
                padding: "0 15px",
                margin: "2px 0",
              }}
            >
              <Typography noWrap component="div" my={1}>
                {loan.sr_no}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.opening_date.split("T")[0].split("-").reverse().join("/")}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.loan_amount}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.amount_to_be_paid}
              </Typography>
              <Typography noWrap component="div" my={1}>
                {loan.daily_payment}
              </Typography>
              <Typography noWrap component="div" my={1}>
                <DatePicker
                  selected={date}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setDate(date)}
                />
              </Typography>
              <TextField
                id="amount"
                name="amount"
                placeholder="Amount"
                size="small"
                onChange={(amount) => setAmount(amount)}
              />
            </Box>
          ))}
        </Box>
    )
}

export default BorrowerDetails;