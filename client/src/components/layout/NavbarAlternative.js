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
    <div class="page-wrapper">
      <div className="nav-wrapper">
        <div class="grad-bar"></div>

        {/* <nav class="navbar" */}
        <nav
          className={`navbar  ${
            menuActive ? "is-active bg-white" : "mobile-nav color-green"
          }`}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
            alt="Company Logo"
          />
          <div
            class="menu-toggle"
            id="mobile-menu"
            onClick={() => setMenuState(!menuActive)}
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <ul class="nav no-search">
            <li class="nav-item">
              <a href="#">Home</a>
            </li>
            <li class="nav-item">
              <a href="#">About</a>
            </li>
            <li class="nav-item">
              <a href="#">Work</a>
            </li>
            <li class="nav-item">
              <a href="#">Careers</a>
            </li>
            <li class="nav-item">
              <a href="#">Contact Us</a>
            </li>
            <i class="fas fa-search" id="search-icon"></i>
            <input class="search-input" type="text" placeholder="Search.." />
          </ul>
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

// <div class="page-wrapper">
// <div className="nav-alt-wrapper">
//   <nav
//     className={`navbar-alt bg-dark ${
//       menuActive ? "is-active bg-dark" : "mobile-nav color-green"
//     }`}
//   >
//     <Link to="/" id="nav-alt-logo">
//       TechNetwork
//     </Link>

//     <div
//       class="menu-toggle"
//       id="mobile-menu"
//       onClick={() => setMenuState(!menuActive)}
//     >
//       <span class="bar"></span>
//       <span class="bar"></span>
//       <span class="bar"></span>
//     </div>

//     <ul class="nav-alt no-search">
//       <li class="nav-alt-item">
//         <Link href="#">Home</Link>
//       </li>
//       <li class="nav-alt-item">
//         <Link href="#">About</Link>
//       </li>
//       <i class="fas fa-search" id="search-icon"></i>
//       <input class="search-input" type="text" placeholder="Search.." />
//     </ul>

//     {/* {!loading && (
//     <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
//   )} */}
//   </nav>
// </div>
// </div>
