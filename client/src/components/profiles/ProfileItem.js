import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    username,
    location,
    bio,
    skills,
    userImg,
  },
}) => {
  const shortenBio = bio ? bio.substring(0, 50) : "";

  return (
    <div className="profile-card bg-light">
      {/* 1 */}
      <img
        src={userImg ? userImg : avatar}
        alt=""
        className="profile-card__img round-img"
      />
      {/* 2 */}
      <div className="profile-card__info-container">
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{company && <span> {company} </span>}</p>
        {/* <p>{bio && <span> {bio} </span>}</p> */}
        <p>{shortenBio}... </p>

        <ul className="skills-list">
          {skills.slice(0.4).map((skill, index) => (
            <li key={index} className="text-primary skill">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>

        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
