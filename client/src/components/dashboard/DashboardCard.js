import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DashboardCard = ({
  profile: {
    status,
    company,
    location,
    user: { name, avatar },
    userImg,
  },
}) => {
  return (
    <div className="profile-top">
      {" "}
      a{/* 1 */}
      <div className="profile-top-high-container">
        <img
          className="round-img my-1"
          src={userImg ? userImg : avatar}
          alt=""
        />
        <h1 className="profile-top__name">{name}</h1>
      </div>
      {/* 2 */}
      <div className="profile-top-low-container">
        {/* 2.1   */}
        <p className="profile-top__status font2-bold">
          {status} {company && <span> at {company}</span>}
        </p>
        {/* 2.2 */}
        <p className="profile-top__location font2-bold">
          {" "}
          {location && <span>{location}</span>}
        </p>
        {/* 2.3 */}
        <div className="icons bg-grey-dark"></div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default DashboardCard;
