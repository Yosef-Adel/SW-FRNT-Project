import axios from "axios";


// let user = "";
// // To get the values of token and id from local storage
// if (window.localStorage.getItem("persist:root")) {
//   user = JSON.parse(
//     JSON.parse(window.localStorage.getItem("persist:root")).user
//   );
// } else {
//   user = "";
// }

// console.log(sessionStorage.getItem("token"))

const url =
  process.env.API_URL || "http://ec2-3-219-197-102.compute-1.amazonaws.com/";

let instance = "";
if (JSON.parse(
  JSON.parse(window.localStorage.getItem("persist:root")).user
)) {
  instance = axios.create({
    baseURL: "https://sw-backend-project.vercel.app/",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(
          JSON.parse(window.localStorage.getItem("persist:root")).user
        ).token,
      ID: JSON.parse(
        JSON.parse(window.localStorage.getItem("persist:root")).user
      ).id,
    },
  });
}

export default instance;
