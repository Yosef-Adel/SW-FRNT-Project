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

let token = "";
let id = "";
if(user){
  token = user.token;
  id = user.id;
}

const url = "https://yosefadel.com/";

let instance = "";
  instance = axios.create({
    baseURL: url,
    headers: {
      Authorization:
        "Bearer " + token,
      ID: id,
    },
  });

export default instance;