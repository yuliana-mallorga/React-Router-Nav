import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  const routes = [];
  routes.push({
    to: "/",
    text: "Home",
  });

  routes.push({
    to: "/profile",
    text: "ProfilePage",
  });

  routes.push({
    to: "/blog",
    text: "BlogPage",
  });

  return (
    <div>
      <h2>Menu</h2>
      <ul className="wrapper">
        {routes.map((route) => {
          return (
            <li key={route.to}>
              <NavLink
                to={route.to}
                style={({ isActive }) => ({
                  color: isActive ? "red" : "blue",
                })}
              >
                {route.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
