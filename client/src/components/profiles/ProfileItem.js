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
      <div className="profile-card__header">
        <img
          src={userImg ? userImg : avatar}
          alt=""
          className="profile-card__img round-img"
        />
        <h2>{name}</h2>
      </div>

      {/* 2 */}
      <div className="profile-card__info-container">
        <p>{status}</p>
        <p>{company && <span> {company} </span>}</p>
        <ul className="skills-list">
          {skills.slice(0.4).map((skill, index) => (
            <li key={index} className="text-primary skill">
              {skill}
            </li>
          ))}
        </ul>
        <p>{shortenBio}... </p>

        <Link
          to={`/profile/${_id}`}
          className="btn btn-primary profile-card__btn "
        >
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
