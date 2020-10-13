import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Dashboard from "../dashboard/Dashboard";

// {
//   getCurrentProfile,
//   deleteAccount,
//   auth: { user },
//   profile: { profile, loading },
// }

const NavbarAlternative = ({
  auth: {
    user,
    // user: { name },
    isAuthenticated,
    loading,
  },
  logout,
}) => {
  //
  let trimmedUserName = (username) => {
    return username.trim().split(" ")[0];
  };

  const [menuActive, setMenuState] = useState(false);
  const [searchInputActive, setSearchInputState] = useState(false);

  const authLinks = (
    <ul className="nav no-search">
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/profiles">Network Users</Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/posts">Posts</Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">
            {user ? trimmedUserName(user.name) : "Profile"}
          </span>
          {/* <span className="hide-sm">{user ? user.name : "Dashboard"}</span> */}
        </Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
      <i
        className="fas fa-search"
        id="search-icon"
        onClick={() => setSearchInputState(!searchInputActive)}
      ></i>
      <input className="search-input" type="text" placeholder="Search.." />
    </ul>
  );

  const guestLinks = (
    <ul className="nav no-search">
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/profiles">Network Users</Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/register">Register</Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(!menuActive)}>
        <Link to="/login">Login</Link>
      </li>
      <i
        className="fas fa-search"
        id="search-icon"
        onClick={() => setSearchInputState(!searchInputActive)}
      ></i>
      {/* <input className="search-input" type="text" placeholder="Search.." /> */}
      <input
        // className={searchInputActive ? "search" : "no-search"}
        className={` nav-input ${
          searchInputActive ? "search-active" : "search-input"
        }`}
        type="text"
        placeholder="Search Users..."
      />
    </ul>
  );

  return (
    <div className="page-wrapper">
      <div className="nav-wrapper">
        <div className="grad-bar"></div>

        <nav
          className={`navbar bg-dark ${
            menuActive ? "is-active" : "mobile-nav"
          } `}
        >
          {/* <nav
            className={`navbar bg-dark ${
              menuActive ? "is-active" : "mobile-nav"
            } ${searchInputActive ? "search" : "no-search"}`}
          ></nav> */}
          <h1>
            <Link to="/" id="nav-logo">
              <i className="fas fa-code-branch"></i> TechNetwork
            </Link>
          </h1>

          <div
            className="menu-toggle"
            id="mobile-menu"
            onClick={() => setMenuState(!menuActive)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};

NavbarAlternative.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarAlternative);
