// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.scss";

import React from "react";
import Wrapper from "./src/components/wrapper";
import Connection from "./src/components/connection";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname);
  console.log("old pathname", prevLocation ? prevLocation.pathname : null);
};

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <Connection>
      <Wrapper element={element} />
    </Connection>
  );
};
