import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { IoIosApps } from "react-icons/io";
import { useLocation } from "react-router-dom";

export default (props) => {
  let location = useLocation().pathname;
  const [active, setActive] = React.useState(location);
  return (
    <>
      <div className="top-menu">
        <span className="top-menu-title">
          {props.icon ? (
            <props.icon className="mr-1" />
          ) : (
            <IoIosApps className="mr-1" />
          )}

          {props.title || "Z-Code"}
        </span>
      </div>
      <ul className="bottom-menu">
        {routes
          .filter((r) => r.layer === 1)
          .map((r, i) => (
            <li key={i}>
              <Link
                to={r.to}
                className={active === r.to ? "active" : ""}
                onClick={(e) => setActive(r.to)}
              >
                <r.icon className="d-block m-auto" />
                <span>{r.title}</span>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};
