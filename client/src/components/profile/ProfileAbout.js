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
    <div className="profile-about bg-white">
      <h2 className="text-primary font2-reg">Skill Set</h2>
      <div className="skills-list-profile">
        {skills.map((skill, index) => (
          <div key={index} className="skill skill-profile">
            {skill}
          </div>
        ))}
      </div>

      <div className="line"></div>
      {bio && (
        <div className="about-bio-container">
          {" "}
          {/* Option to show only first name */}
          {/* <h2 className="text-primary">{name.trim().split(" ")[0]}' s Bio </h2> */}
          <h2 className="text-primary font2-reg">About</h2>
          <p>{bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileAbout;
