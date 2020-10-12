import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div key={edu._id} className="dashboard-edu-list">
      <div className="dashboard-edu-list-top">
        <h3 className="text-dark edu-list-top-inst">
          Institution: {edu.school}
        </h3>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
      </div>

      <div className="dashboard-edu-list-bottom">
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>

        <p>
          <strong>Description: </strong> {edu.description}
        </p>
      </div>

      <button
        onClick={() => deleteEducation(edu._id)}
        className="btn btn-danger btn-delete-exp-edu"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="dashboard-edu-container">
      <h2 className="my2 font2-bold">
        Education
        <span>
          <Link to="/add-education" className="btn-add">
            +
          </Link>
        </span>
      </h2>
      <div className="line"></div>
      <div>{educations}</div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
