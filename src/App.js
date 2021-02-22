import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/style.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext, ZAuth } from "./auth/ZAuth";
import routes from "./routes";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <Router>
      <ZAuth>
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
      </ZAuth>
      <ToastContainer />
    </Router>
  );
}

export default App;
