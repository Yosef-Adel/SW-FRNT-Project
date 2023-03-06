import React from 'react'
import classes from './home.module.css'
import NavBar from '../../layouts/nav/NavBar'

import Banner from "./banner/Banner";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar/>
      <Banner />
    </div>
  );
};

export default HomePage;
