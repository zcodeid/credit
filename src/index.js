import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./.aws-config/awsconfig";
import awsauth from "./.aws-config/awsauth";

const origin = window.location.origin;
const awsConfig = {
  ...awsconfig,
  redirectSignIn: origin,
  redirectSignOut: origin,
};
if (origin.indexOf("zcode.id") >= 0)
  awsConfig.userPoolWebClientId = "35arkvtj29lnm9e6p8bqcai0v4";

const authConfig = {
  ...awsauth,
  redirectSignIn: origin,
  redirectSignOut: origin,
};
Amplify.configure(awsConfig);
Auth.configure({ oauth: authConfig });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
