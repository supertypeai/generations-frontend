import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import EnrollFormModal from "../EnrollFormModal";

export const scrollToSection = (sectionName) => {
  const section = document.querySelector(`#${sectionName}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ProMembershipStatus = ({ user }) => {
  if (user.proUser) {
    return (
      <li className="text-slate-400">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          Pro User <br />
          Expires: {user.proExpiry}
        </span>
      </li>
    );
  } else {
    return (
      <li>
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 3a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm0 6a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Upgrade to Pro</span>
        </button>
      </li>
    );
  }
};

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { u } = useContext(UserContext);
  const [user] = u;

  useEffect(() => {
    if (user?.token) {
      setLoggedIn(true);
    }
  }, [user]);

  const handleLogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("userSession");
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start text-sm">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={(e) => scrollToSection("curations")}>
                Curations
              </button>
            </li>
            <li>
              <button onClick={(e) => scrollToSection("fellowship")}>
                Cohort-based Fellowship
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost normal-case text-xl">
            Fellowship
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={(e) => scrollToSection("curations")}>
                Curations
              </button>
            </li>
            <li>
              <button onClick={(e) => scrollToSection("fellowship")}>
                Cohort Program
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <button
              onClick={(e) => scrollToSection("curations")}
              className="btn btn-ghost"
            >
              Curations
            </button>
          </li>
          <li>
            <button
              onClick={(e) => scrollToSection("fellowship")}
              className="btn btn-ghost"
            >
              Cohort-based Fellowship
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <p className="text-xs text-gray-500">
          {JSON.stringify(user)} | {user.token ? "Logged in" : "Not logged in"}
        </p> */}

        {loggedIn ? (
          // <div
          //   className="btn btn-secondary"
          //   onClick={(event) => handleLogOut(event)}
          // >
          //   Log Out
          // </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              Account
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content p-2 text-sm shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li className="menu-title">
                <span>Account Information</span>
              </li>
              <li className="text-slate-400">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {user.username}
                </span>
              </li>
              <ProMembershipStatus user={user} />

              {/* separator */}
              <li className="divider"></li>
              <li className="menu-title">
                <span>Account Settings</span>
              </li>
              <li>
                <span>Reset Password</span>
              </li>
              <li>
                <span onClick={(event) => handleLogOut(event)}>Log Out</span>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <label className="btn btn-secondary" htmlFor="enroll">
              Enroll in Fellowship
            </label>
            <EnrollFormModal />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
