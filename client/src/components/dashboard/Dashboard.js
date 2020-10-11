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
        <h1 className="large text-primary">Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
      </div>
      {/* ACTIONS */}
      <DashboardActions className="dashboard-actions-container" />

      {profile !== null ? (
        <>
          {/* CARD */}
          <div className="dashboard-card">
            <ProfileTop profile={profile} className="dashboard-card-top" />
            <div className="dashboard-card-skills">SKILLS GO HERE</div>
          </div>

          {/* EXPERIENCE */}
          <Experience
            experience={profile.experience}
            className="dashboard-exp-container"
          />
          {/* EDUCATION */}
          <Education
            education={profile.education}
            className="dashboard-edu-container"
          />

          {/* FOOTER */}
          <button
            className="btn btn-danger btn-delete-profile"
            onClick={() => deleteAccount()}
          >
            <i className="fas fa-user-minus"></i> Delete My Account
          </button>
        </>
      ) : (
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
