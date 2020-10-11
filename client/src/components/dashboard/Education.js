import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div key={edu._id}>
      <h3 className="text-dark">{edu.school}</h3>
      <h3 className="hide-sm">{edu.degree}</h3>

      <p>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </p>

      <button
        onClick={() => deleteEducation(edu._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="bg-white">
      <h2 className="my2 font2-bold">
        Education
        <span>
          <Link to="/add-education" className="btn-add">
            +
          </Link>
        </span>
      </h2>
      <div>{educations}</div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
