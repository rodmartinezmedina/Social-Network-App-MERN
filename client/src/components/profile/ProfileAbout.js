import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-white p-2">
      {bio && (
        <div className="about-bio-container">
          {" "}
          {/* Option to show only first name */}
          <h2 className="text-primary">{name.trim().split(" ")[0]}' s Bio </h2>
          {/* <h2 className="text-primary">{name}' s Bio </h2> */}
          <p>{bio}</p>
          <div className="line"></div>
        </div>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills-list-profile">
        {skills.map((skill, index) => (
          <div key={index} className="skill skill-profile">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
