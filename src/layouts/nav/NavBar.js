import React from 'react'
import classes from './navbar.module.css'
import navData from '../../assets/data/navData'
import logo from '../../assets/brand/envie.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NavLink } from 'react-router-dom'

/**
 * Component that renders nav bar
 *
 * @component
 */
const NavBar = (props) => {
    const logged = true;
    const email= logged? 'ranaagamaaall@gmail.com':''
    console.log(navData)
    const page = logged? navData.homeUser : navData.homeAttendee

  return (
    <div className={classes.nav}>
        {/* <NavLink to='/'  activeClassName={classes.activeLink}> */}
            <div className={classes.logoContainer}>
                <img className={classes.logo} src={logo} alt='logo'/>
            </div>
        {/* </NavLink> */}


        <div className={classes.routes}>
            <ul>
                {page[0].map((element,index) => {
                    return(
                        <div className={classes.list}>
                            <li className={`${classes.navItem} ${element.color? classes.blue: ""}`}>
                                <NavLink to={element.route}  activeClassName={classes.activeLink}>
                                    <div className={classes.wrapper}>
                                        {element.icon} 
                                        <div>{element.title} {element.list && <KeyboardArrowDownIcon className={classes.arrow}/>}</div>
                                    </div>
                                </NavLink>
                            
                                {element.list && 
                                <ol className={classes.dropDown}>
                                    {element.list.map( (item, index) => {
                                    return (<li className={classes.navSubItem}>
                                        <NavLink to={item.route}  activeClassName={classes.activeLink}>  
                                        {item.title}  
                                        </NavLink>
                                    </li>)
                                    })}
                                </ol>}
                            </li>
                              
                        </div>
                    )
                })}
            </ul>
            <ul>
                {page[1].map((element,index) => {
                    return(
                        <>
                            <li className={classes.navItem}>
                                <NavLink to={element.route}  activeClassName={classes.activeLink}>  
                                    <div className={classes.wrapper}>
                                        {element.icon}
                                        <div>{element.inlineIcon} {element.title}  {email} {element.list && <KeyboardArrowDownIcon className={classes.arrow}/>}</div>
                                    </div>
                                </NavLink>
                                
                                {element.list && 
                                <ol className={classes.dropDown}>
                                {element.list.map( (item, index) => {
                                return (<li className={classes.navSubItem}>
                                    <NavLink to={item.route}  activeClassName={classes.activeLink}>  {item.title}  </NavLink>
                                </li>)
                                })}
                            </ol>}
                            </li>  
                        </>
                    )
                })}
            </ul>
        </div>
        
        

      
    </div>
  )
}

export default NavBar