import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import axios from "axios";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Adress"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);

//EXAMPLE HERE: DO NOT DELETE
// //Request for creating user without redux
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
