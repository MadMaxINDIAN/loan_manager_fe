import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const list1 = [
  {
    title: "Dashboard",
    icon: <DashboardRoundedIcon />,
    route: "/dashboard",
  },
  {
    title: "New Account",
    icon: <PersonAddAlt1RoundedIcon />,
    route: "/dashboard/new_account",
  },
  {
    title: "New Entry",
    icon: <ReceiptRoundedIcon />,
    route: "/dashboard/new_entry",
  },
  {
    title: "Loans List",
    icon: <AssessmentRoundedIcon />,
    route: "/dashboard/reports",
  },
  {
    title: "Transactions",
    icon: <CurrencyRupeeIcon />,
    route: "/dashboard/transactions",
  }
];

export default {
  first: list1,
};
