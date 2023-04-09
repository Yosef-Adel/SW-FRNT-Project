import React , {useState, useEffect} from "react";
import classes from "./creatorHome.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import Footer from "../../layouts/footer/Footer";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';

/**
 * Component that returns Creator's main page
 * 
 * @component
 * @example
 * return(<HomePage />)
 */
const CreatorHomePage = () => {
  
    const user = useSelector( state => state.user)

    let id = user.id;
    const [name, setName] = useState([])
    const navigate = useNavigate();

    async function switchCreator() {
        let response = "";
        try {
          response = await axios.get(
            routes.userToCreator+"/"+id
          );
          setName([user.firstName, user.lastName])

          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response;
          }
        }
      }

      const checkCreator = () => {
        if(user.loggedIn && !user.creator){
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
