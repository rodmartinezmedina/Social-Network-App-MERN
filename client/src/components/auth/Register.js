import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//we bring an action from alert.js and then we are going to pass it with connect()
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //"Passwords do not match" gets passed as a msg to setAlert action
      //"danger" will be the alert type
      setAlert("Passwords do not match", "danger");
      console.log("Passwords do not match");
    } else {
      register({ name, email, password });
      console.log("Register was Successful");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Adress"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // minLength="6"
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            // minLength="6"
            // required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

//CONNECT() EXPLANATION AND BRINGING ACTIONS
//with connect we pass the actions we bring
//connect takes in 2 things.
//1) Any state you want to map(if we want to get state from alert or profile, etc)
//2) An object with any actions we want to use.
// This lets us acces for example props.setAlert. We pass props in the initial parenthesis of the function
//If we dont want to use props we just destructure and pass all the actions we linked and want to use inside of initial parenthesis
//
//
//
//REQUEST FOR CREATING USER WITHOUT USING REDUX
//EXAMPLE HERE: DO NOT DELETE
//
// const onSubmit = async (e) => {
//   e.preventDefault();
//   if (password !== password2) {
//     console.log("Passwords do not match");
//   } else {
//     const newUser = {
//       name,
//       email,
//       password,
//     };
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const body = JSON.stringify(newUser);
//       //we can user /api/users because we proxy was added in package.json
//       const res = await axios.post("/api/users", body, config);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err.response.data);
//     }

//     console.log(formData);
//   }
// };
