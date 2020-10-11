import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "../profile/ProfileTop";
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
      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
      </div>

      {/* MAIN */}
      {profile !== null ? (
        <>
          <div className="dashboard-elements">
            {/* 1 */}
            <div className="dashboard-top">
              <ProfileTop
                profile={profile}
                className="dashboard-profile-card"
              />
            </div>

            {/* 2 */}
            <div>
              <DashboardActions className="actions-dash" />
              <Experience
                experience={profile.experience}
                className="exp-dash"
              />
              <Education education={profile.education} className="edu-dash" />
            </div>
            {/* 3 */}
          </div>
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fas fa-user-minus"></i> Delete My Account
          </button>
        </>
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
