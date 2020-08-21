import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="!#">Developers</Link>
      </li>
      <li>
        <Link to="/">Logout</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Developers</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          {/* <i className="fas fa-terminal"></i> */}
          <i className="fas fa-code-branch"></i> CodingNetwork
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
