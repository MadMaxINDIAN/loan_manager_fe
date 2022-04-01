import Layout from "./Layout";
import DashboardComponent from "./components/DashboardComponent";
import ReportsComponent from "./components/ReportsComponent";
import { Navigate } from "react-router-dom";
import NewAccountComponent from "./components/NewAccountComponent";
import Home from "./Home";
import NewEntryComponent from "./components/NewEntryComponent";
import Transactions from "./components/Transactions";
import LoanDetails from "./components/LoanDetailsComponent";

const routes = [
  {
    path: "dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <DashboardComponent />,
      },
      {
        path: "reports",
        element: <ReportsComponent />,
      },
      {
        path: "reports/:id",
        element: <LoanDetails />,
      },
      {
        path: "new_account",
        element: <NewAccountComponent />,
      },
      {
        path: "new_entry",
        element: <NewEntryComponent />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
  // {
  //     path: "login",
  //     element: <LoginLayout />,
  // },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
];

export default routes;
