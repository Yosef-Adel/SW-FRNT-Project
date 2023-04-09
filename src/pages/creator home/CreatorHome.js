import React , {useState, useEffect} from "react";
import classes from "./creatorHome.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import Footer from "../../layouts/footer/Footer";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";

/**
 * Component that returns Creator's main page
 * 
 * @component
 * @example
 * return(<HomePage />)
 */
const CreatorHomePage = () => {
    let id = sessionStorage.getItem("id");
    const [name, setName] = useState([])
    const navigate = useNavigate();

    async function switchCreator() {
        let response = "";
        try {
          response = await axios.get(
            routes.userToCreator+"/"+id
          );
          setName([response.data.firstName, response.data.lastName])

          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response;
          }
        }
      }

      const checkCreator = () => {
        if(sessionStorage.getItem("token")){
            const resp = switchCreator();
        }else{
            navigate("/login");
        }
      }

      useEffect(() => {
        checkCreator();
      }, []);

  return (
    <div className={classes.container}>
      <CreatorNav name={name}/>
 
      <Footer />
    </div>
  );
};

export default CreatorHomePage;
