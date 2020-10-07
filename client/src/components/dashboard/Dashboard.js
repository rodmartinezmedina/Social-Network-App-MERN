import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="dashboard-page-container">
      {/* 1 */}
      <h1 className="large text-primary">Dashboard</h1>
      {/* 2 */}
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {/* 3 */}
      {profile !== null ? (
        <div className="dashboard-elements">
          {/* 3.1 */}
          <DashboardActions className="actions-dash" />
          {/* 3.2 */}
          <Experience experience={profile.experience} className="exp-dash" />
          {/* 3.3 */}
          <Education education={profile.education} className="edu-dash" />
          {/* 3.4 */}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </div>
      ) : (
        // 3
        <Fragment>
          <p>
            You have not filled up your profile yet, please add some information
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  deleteAccount: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
