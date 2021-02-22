import React, { useState, useMemo, createContext } from "react";
import { Auth, Hub } from "aws-amplify";

const AuthContext = createContext();
const ZAuth = (props) => {
  const [user, setUser] = useState(null);
  const logout = () => {
    // localStorage.clear();
    Auth.signOut();
  };

  const authMemo = useMemo(() => ({ user, logout }), [user]);
  const init = async () => {
    try {
      const u = await Auth.currentAuthenticatedUser();
      const username = u.username;
      const email = u.attributes.email;
      setUser({ username, email });
    } catch (err) {
      setUser(undefined);
    }
  };

  const listen = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log("SIGN IN");
          break;
        case "signOut":
          setUser(undefined);
          break;
      }
    });
  };

  React.useEffect(() => {
    init();
    listen();
  }, []);

  return (
    <AuthContext.Provider value={authMemo}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { ZAuth, AuthContext };