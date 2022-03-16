import { connect, Provider } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import { SnackbarProvider } from "notistack";
import { removeLoader } from "./redux/services/actions/loaderActions";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import routes from "./routes";
import { CircularProgress } from "@mui/material";

class ReduxSetup extends Component {
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          maxSnack={3}
        >
          {this.props.children}
        </SnackbarProvider>
      </Provider>
    );
  }
}

function RouterSetup(props) {
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.loading.isLoading}
        onClick={props.removeLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {useRoutes(routes)}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const RouterUpgrade = connect(mapStateToProps, { removeLoader })(RouterSetup);

class App extends Component {
  render() {
    return (
      <div className="loan-management-app">
        <ReduxSetup>
          <Router>
            <RouterUpgrade />
          </Router>
        </ReduxSetup>
      </div>
    );
  }
}

export default App;
