import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
    userImg,
  },
}) => {
  return (
    <div className="profile-top">
      {/* 1 */}
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
        <p className="profile-top__status">
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="profile-top__location">
          {" "}
          {location && <span>{location}</span>}
        </p>

        <div className="icons bg-primary">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}

          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}

          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}

          {social && social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
