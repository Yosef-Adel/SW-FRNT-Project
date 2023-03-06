import React from 'react'
import classes from './home.module.css'
import NavBar from '../../layouts/nav/NavBar'


const HomePage = () => {
  return (
    <div className={classes.container}>
        <NavBar/>
    </div>
  )
}

export default HomePage