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
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "_id",
  },
  { field: "id", headerName: "Sr. No.", width: 60, align: "center" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "opening_date",
    headerName: "Opening Date",
    type: "date",
    width: 120,
  },
  {
    field: "loan_amount",
    headerName: "Loan Amount",
    width: 120,
    valueFormatter: ({ value }) => value.split("₹")[1],
    renderCell: ({ value }) => value,
  },
  {
    field: "amount_to_be_paid",
    headerName: "Amount Remaining",
    width: 150,
    valueFormatter: ({ value }) => value.split("₹")[1],
    renderCell: ({ value }) => value,
  },
  {
    field: "daily_payment",
    headerName: "Daily Payment",
    width: 120,
    valueFormatter: ({ value }) => value.split("₹")[1],
    renderCell: ({ value }) => value,
  },
  {
    field: "days_remaining",
    headerName: "Days Remaining",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 70,
  },
];

export default function LoansList(props) {
  const [pageSize, setPageSize] = React.useState(50);
  const navigate = useNavigate();
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const rows = props.loans.map((loan, index) => ({
    _id: loan._id,
    id: loan.sr_no,
    name: loan.borrower_id.name,
    opening_date: loan.opening_date.slice(0, 10).split("-").reverse().join("/"),
    loan_amount: dollarIndianLocale.format(loan.loan_amount),
    amount_to_be_paid: dollarIndianLocale.format(loan.amount_to_be_paid),
    daily_payment: dollarIndianLocale.format(loan.daily_payment),
    days_remaining:
      loan.status === "active"
        ? Math.floor(
            (new Date(loan.opening_date).addDays(loan.loan_period).getTime() -
              today.getTime()) /
              (1000 * 3600 * 24)
          ) - 1
        : "-",
    status: loan.status,
  }));
  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Loans List
      </Typography>
      <Box
        sx={{
          height: 500,
          minWidth: "900px",
          "& .super-app-theme--baddebt": {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.info.main, theme.palette.mode),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.info.main,
                  theme.palette.mode
                ),
              cursor: "pointer",
            },
          },
          "& .super-app-theme--closed": {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
              cursor: "pointer",
            },
          },
          "& .super-app-theme--active": {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.warning.main,
                  theme.palette.mode
                ),
              cursor: "pointer",
            },
          },
          "& .super-app-theme--cosed": {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.error.main, theme.palette.mode),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                ),
              cursor: "pointer",
            },
          },
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
          getRowClassName={(params) =>
            `super-app-theme--${params.row.status.replace(" ", "")}`
          }
          onCellClick={(e) => {
            navigate(`/dashboard/reports/${e.row._id}`);
          }}
          columnVisibilityModel={{ _id: false }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </div>
  );
}
