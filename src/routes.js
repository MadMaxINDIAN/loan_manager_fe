import Layout from "./Layout";
import DashboardComponent from "./components/DashboardComponent";
import ReportsComponent from "./components/ReportsComponent";
import { Navigate } from "react-router-dom";
import NewAccountComponent from "./components/NewAccountComponent";
import NewEntryComponent from "./components/NewEntryComponent";

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
        path: "new_account",
        element: <NewAccountComponent />,
      },
      {
        path: "new_entry",
        element: <NewEntryComponent />,
      },
    ],
  },
  // {
  //     path: "login",
  //     element: <LoginLayout />,
  // },
  {
    path: "/",
    element: <>Hello world</>,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
];

export default routes;
