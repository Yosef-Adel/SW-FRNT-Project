import axios from "axios";

let user = "";
// To get the values of token and id from local storage
if (window.localStorage.getItem("persist:root")) {
  user = JSON.parse(
    JSON.parse(window.localStorage.getItem("persist:root")).user
  );
} else {
  user = "";
}

const url =
  process.env.API_URL || "http://ec2-3-219-197-102.compute-1.amazonaws.com/";

let instance = "";

  instance = axios.create({
    baseURL: url,
    headers: {
      Authorization:
        "Bearer " +
        JSON.parse(JSON.parse(window.localStorage.getItem("persist:root")).user)
          .token,
      ID: user.id,
    },
  });


export default instance;
