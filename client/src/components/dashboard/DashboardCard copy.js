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
    skills,
    loading
  },
}) => {
  return (
    <div className="dashboard-card-component">
      <img
          className="round-img my-1 dashboard-card-img "
          src={userImg ? userImg : avatar}
          alt=""
      />
      <h1 className="dashboard-card-name">{name}</h1>   
      <p className="dashboard-card-status font2-bold">
          {status} {company && <span> at {company}</span>}
      </p>
      <p className="dashboard-card-location font2-bold">
         {location && <span>{location}</span>}
      </p>
      {/* <div className="dashboard-skills .bg-grey-light">
        <h2 className="text-primary font2-reg">Skill Set</h2>  
        <div className="dashboard-skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="dashboard-eachSkill">
              {skill}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

DashboardCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default DashboardCard;
