import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

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
  },
  {
    title: "Reports",
    icon: <AssessmentRoundedIcon />,
  },
];

export default {
  first: list1,
};
