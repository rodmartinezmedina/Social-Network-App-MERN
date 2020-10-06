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
  const shortenBio = bio ? bio.substring(0, 60) : "";

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
        <p className="profile-card__status">{status}</p>
        <p className="profile-card__company">
          {company && (
            <span>
              <i class="far fa-building"></i> {company}{" "}
            </span>
          )}
        </p>
        <ul className="skills-list">
          {skills.slice(0, 2).map((skill, index) => (
            <li key={index} className="skill">
              {skill}
            </li>
          ))}
          {/* <li className="skill skill__count">+{skills.length - 2}</li> */}
          <li className="skill skill__count">
            {skills.length <= 2 ? "+ 0" : <span>+ {skills.length - 2}</span>}
          </li>
        </ul>
        <p className="card-bio">{shortenBio}... </p>
      </div>
      {/* 3 */}
      <div className="card-btn">
        <Link to={`/profile/${_id}`}>View Profile</Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
