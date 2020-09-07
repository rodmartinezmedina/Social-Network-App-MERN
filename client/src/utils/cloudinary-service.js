import axios from "axios";

class Cloudinary {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  // "https://api.Cloudinary.com/v1_1/:dvioc75zu/image/upload",

  imageUpload(imageFile) {
    return (
      this.auth
        .post("/api/cloudinary", imageFile)
        // .post("/api/cloudinary", imageFile)
        .then((imageUrl) => imageUrl.data)
    );
  }
}

const cloudinaryService = new Cloudinary();
export default cloudinaryService;
