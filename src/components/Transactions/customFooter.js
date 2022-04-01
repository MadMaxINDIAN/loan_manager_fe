import * as React from "react";
import Box from "@mui/material/Box";

function CustomFooterTotalComponent(props) {
  let dollarIndianLocale = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  return (
    <Box sx={{ padding: "10px", display: "flex" }}>
      Total : {dollarIndianLocale.format(props.total)}
    </Box>
  );
}

export { CustomFooterTotalComponent };
