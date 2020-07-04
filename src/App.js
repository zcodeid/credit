import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((r, i) =>
          r.public ? (
            <Route
              key={i}
              path={r.to}
              exact={r.exact}
              component={r.component}
            />
          ) : (
            <PrivateRoute
              key={i}
              path={r.to}
              exact={r.exact}
              component={r.component}
            />
          )
        )}
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
