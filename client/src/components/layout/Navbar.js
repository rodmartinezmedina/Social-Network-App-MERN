import React, { Fragment, useEffect } from "react";
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

const Navbar = ({
  auth: {
    user,
    // user: { name },
    isAuthenticated,
    loading,
  },
  logout,
}) => {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);

  let trimmedUserName = (username) => {
    return username.trim().split(" ")[0];
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Network Users</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">
            {user ? trimmedUserName(user.name) : "Profile"}
          </span>
          {/* <span className="hide-sm">{user ? user.name : "Dashboard"}</span> */}
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Network Users</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/" id="nav-logo">
          {/* <i className="fas fa-terminal"></i> */}
          <i className="fas fa-code-branch"></i> TechNetwork
        </Link>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
