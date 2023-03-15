import React, { useState } from 'react'
import classes from './FilterTabs.module.css'
import FilterTabsData from '../../assets/data/FilterTabsData'
import { NavLink } from 'react-router-dom'


const FilterTabs= () => {
    const page =FilterTabsData.FilterTabsInfo;
    const [clicked, setclicked] = useState(0);
    console.log(page); 
    
    return(
        <div className={classes.FilterNav}>
            <div className={classes.Nav}>
                <ul>
                    {page[0].map((element,index) => {
                        return(
                            <div>
                                <li className={`${classes.navItem}`} onClick={() => setclicked(index)}>
                                    <NavLink to={element.route}  activeClassName={classes.activeLink}>
                                    <div>
                                        <div className={clicked==index? classes.clicked:classes.element}>{element.title}</div>
                                    </div>
                                    </NavLink>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
   

}
export default FilterTabs