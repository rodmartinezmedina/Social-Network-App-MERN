import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardCard from "../dashboard/DashboardCard";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, skills, loading },
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
            <DashboardCard profile={profile} />
            <div className="dashboard-skills .bg-grey-light">
              <h2 className="text-primary font2-reg">Skill Set</h2>
              <div className="skills-list-profile">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="skill skill-profile">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="dashboard-exp-container">
            <Experience experience={profile.experience} />
          </div>

          {/* EDUCATION */}
          <div className="dashboard-edu-container">
            <Education education={profile.education} />
          </div>

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
