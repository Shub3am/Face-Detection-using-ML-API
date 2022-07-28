import React from "react";
import Logo from "./Header_Components/Logo";
import Menu from "./Header_Components/Menu";

function Header({ onRouteChange, route, loggedin }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
      }}
    >
      <Logo />
      <Menu route={route} logdata={loggedin} onRouteChange={onRouteChange} />
    </div>
  );
}

export default Header;
