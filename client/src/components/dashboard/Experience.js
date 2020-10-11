import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <div key={exp._id}>
      <h3 className="text-dark">{exp.company}</h3>
      <h3 className="hide-sm">{exp.title}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {!exp.to ? "Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {exp.title}
      </p>
      <p>
        <strong>Description: </strong> {exp.description}
      </p>
      <button
        onClick={() => deleteExperience(exp._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="bg-white">
      <h2 className="dash-exp-header my2 font2-bold">
        Experience{" "}
        <span>
          <Link to="/add-experience" className="btn-add">
            +
          </Link>
        </span>
      </h2>

      <span className="line-dashboard"></span>
      <div className="font1-reg">{experiences}</div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);

// const experiences = experience.map((exp) => (
//   <tr key={exp._id}>
//     <td>{exp.company}</td>
//     <td className="hide-sm">{exp.title}</td>
//     <td>
//       <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
//       {exp.to === null ? (
//         " Now"
//       ) : (
//         <Moment format="DD/MM/YYYY">{exp.to}</Moment>
//       )}
//     </td>
//     <td>
//       <button
//         onClick={() => deleteExperience(exp._id)}
//         className="btn btn-danger"
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// ));

// <Fragment>
// <h2 className="my2 font2-bold">Experience</h2>
// <table className="table">
//   <thead>
//     <tr>
//       <th className="">Company</th>
//       <th className="hide-sm">Title</th>
//       <th className="hide-sm">Years</th>
//     </tr>
//   </thead>
//   <span className="line-dashboard"></span>
//   <tbody className="font1-reg">{experiences}</tbody>
// </table>
// </Fragment>
