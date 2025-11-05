import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from './auth/useAuth'

function Menu() {
  const auth = useAuth()

  const routes = [];
  routes.push({
    to: "/",
    text: "Home",
    private: false,
  });

  routes.push({
    to: "/profile",
    text: "ProfilePage",
    private: true,
  });

  routes.push({
    to: "/blog",
    text: "BlogPage",
    private: false,
  });

  routes.push({
    to: "/login",
    text: "LoginPage",
    private: false,
  });

  routes.push({
    to: "/logout",
    text:"LogoutPage",
    private: true,
  })

  return (
    <div>
      <h2>Menu</h2>
      <ul className="wrapper">
        {routes.map((route) => {
          if (route.private && !auth.user) return null
          if ((route.to === '/login') && auth.user) return null
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

export {Menu};
