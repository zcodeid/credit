import React from "react";
import { GiConqueror } from "react-icons/gi";

export default (props) => {
  return (
    <>
      <section className="text-secondary text-center">
        <small>
          _______ <GiConqueror /> _______
        </small>
        <p className="mt-1">
          call me:{" "}
          <a
            href="https://wa.me/6285776556212"
            target="_blank"
            rel="noopener noreferrer"
          >
            +6285776556212
          </a>
        </p>
      </section>
    </>
  );
};
