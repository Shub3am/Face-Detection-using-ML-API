import React from "react";

function Menu({ onRouteChange, route, logdata }) {
  if (logdata) {
    return <h2 onClick={() => onRouteChange("signin")}>Log Out</h2>;
  } else {
    return <h2 onClick={() => onRouteChange("home")}>Sign In</h2>;
  }
}

export default Menu;
