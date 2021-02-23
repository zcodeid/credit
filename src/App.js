import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/style.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext, ZAuth } from "./auth/ZAuth";
import routes from "./routes";

const Main = (props) => {
  const { user } = React.useContext(AuthContext);
  if (user === null) return <div />;
  if (user === undefined) return <Redirect to="/landing" />;
  return (
    <>
      {routes.map((r, i) => (
        <Route key={i} path={r.to} exact={r.exact} component={r.component} />
      ))}
    </>
  );
};

function App() {
  return (
    <Router>
      <ZAuth>
        <Switch>
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </ZAuth>
      <ToastContainer />
    </Router>
  );
}

export default App;
