import React , {useState, useEffect} from "react";
import classes from "./creatorHome.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import Footer from "../../layouts/footer/Footer";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import {userActions} from '../../store/userSlice'
import SideBar from "./Sidebar";

/**
 * Component that returns Creator's main page
 * 
 * @component
 * @example
 * return(<CreatorHomePage />)
 */
const CreatorHomePage = () => {
  
    const user = useSelector( state => state.user)
    const id = user.id;
    const [name, setName] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();


    async function switchCreator() {
        let response = "";
        try {
          response = await axios.get(
            routes.userToCreator+"/"+id
          );
          dispatch(userActions.creator(
            { 
              isCreator: response.data.isCreator 
            }))
          setName([user.firstName, user.lastName])
          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response;
          }
        }
      }

      const checkCreator = () => {
        if(user.loggedIn && !user.isCreator){
            switchCreator();
        }else{
            navigate("/login");
        }
      }

      useEffect(() => {
        checkCreator();
      }, []);

  return (
    <>
      <CreatorNav/>
      <div className={classes.container}>
        <SideBar/>
      </div>
    </>
  );
};

export default CreatorHomePage;
