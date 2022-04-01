import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const today = new Date();
today.setHours(5, 30, 0, 0);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "_id",
  },
  {
    field: "sr_no",
    headerName: "Sr. No.",
  },
  {
    field: "name",
    headerName: "Name",
    width: 250
  },
  {
    field: "date",
    headerName: "Transaction date",
    width: 150,
    align: "right"
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    align: "right"
  }
];

export default function LoansList(props) {
  const [pageSize, setPageSize] = React.useState(100);
  const navigate = useNavigate();
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const rows = props.transactions.map((transaction, index) => ({
    _id: transaction._id,
    sr_no: transaction.loan_account_id.sr_no,
    id: transaction._id,
    name: transaction.loan_account_id.borrower_id.name,
    date: transaction.date.slice(0, 10),
    amount: dollarIndianLocale.format(transaction.amount),
  }));
  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          height: 400,
          minWidth: "900px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          disableSelectionOnClick
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columnVisibilityModel={{ _id: false }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </div>
  );
}
