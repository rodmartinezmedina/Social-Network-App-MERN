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

  const authLinks = (
    <ul clsass="nav no-search">
      <li class="nav-item">
        <Link to="/profiles">Network Users</Link>
      </li>
      <li class="nav-item">
        <Link to="/posts">Posts</Link>
      </li>
      <li class="nav-item">
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">
            {user ? trimmedUserName(user.name) : "Profile"}
          </span>
          {/* <span className="hide-sm">{user ? user.name : "Dashboard"}</span> */}
        </Link>
      </li>
      <li class="nav-item">
        <Link onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
      <i class="fas fa-search" id="search-icon"></i>
      <input class="search-input" type="text" placeholder="Search.." />
    </ul>
  );

  const guestLinks = (
    <ul class="nav no-search">
      <li class="nav-item">
        <Link to="/profiles">Network Users</Link>
      </li>
      <li class="nav-item">
        <Link to="/register">Register</Link>
      </li>
      <li class="nav-item">
        <Link to="/login">Login</Link>
      </li>
      <i class="fas fa-search" id="search-icon"></i>
      <input class="search-input" type="text" placeholder="Search.." />
    </ul>
  );

  return (
    <div class="page-wrapper">
      <div className="nav-wrapper">
        <div class="grad-bar"></div>

        <nav
          className={`navbar bg-dark ${
            menuActive ? "is-active" : "mobile-nav"
          }`}
        >
          <h1>
            <Link to="/" id="nav-logo">
              <i className="fas fa-code-branch"></i> TechNetwork
            </Link>
          </h1>

          <div
            class="menu-toggle"
            id="mobile-menu"
            onClick={() => setMenuState(!menuActive)}
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
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
