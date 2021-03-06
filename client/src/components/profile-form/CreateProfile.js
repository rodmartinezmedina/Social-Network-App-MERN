import React, { Fragment, useState } from "react";
//withRouter lets you re route from the action
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";


const NAME_OF_UPLOAD_PRESET = "xdshqlct";
const MY_CLOUD_NAME = process.env.CLOUD_NAME;

async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  // data.append("api_key", `${API_KEY}`);
  // data.append("cloud_name", fileUrl);
  data.append("upload_preset", NAME_OF_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dvioc75zu/image/upload`,
    {
      method: "POST",
      body: data,
      unsigned: true,
      upload_preset: "NAME_OF_UPLOAD_PRESET",
    }
  );
  const userImg = await res.json();
  console.log(userImg);
  return userImg.secure_url;
}

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    userImg: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    // imageReady: false,
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    // imageReady,
    userImg,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [uploadingImg, setUploadingImg] = useState(false);

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    if (!file) return;

    setUploadingImg(true);
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, userImg: uploadedUrl });
    setUploadingImg(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  // const handleImageChange = (event) => {
  //   setFormData({ ...formData, imageReady: false });

  //   const file = event.target.files[0];
  //   const imageFile = new FormData();

  //   imageFile.append("image", file);

  //   cloudinaryService.imageUpload(imageFile).then((imageUrl) => {
  //     setFormData({ userImg: imageUrl, imageReady: true });
  //   });
  // };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => onSubmit(e)}
      // encType="multipart/form-data"
      >
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Architect">Data Architect</option>
            <option value="DevOps">DevOps</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Where are at in your career ?</small>
        </div>

        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImg}
          />
        </div>

        {/* <div className="form-group">
          <label className="label">Profile picture</label>
          <input
            type="file"
            placeholder="Upload your Profile Picture"
            name="userImg"
            onChange={(e) => handleImageChange(e)}
          />
        </div> */}

        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Eg: Freelance, your own company, company you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Your own or your company website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & Country suggested (eg. Barcelona, Spain)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,React)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Create" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

// we use withRouter so we can pass the history object that we destructured at the beggining
// and use it from the action
export default connect(null, { createProfile })(withRouter(CreateProfile));
