import React, { useState} from 'react'
import classes from './FilterTabs.module.css'
import FilterTabsData from '../../../assets/data/FilterTabsData'
import Location from '../location/Location'
import { NavLink } from 'react-router-dom'

const FilterTabs= () => {
    const page =FilterTabsData.FilterTabsInfo;
    const [clicked, setIndexClicked] = useState(0);
    //for selecting multiple filters ---- to make it usestate of indexclicked([1,0,0,0,0,0])---- if condition (clicked[index]==1)
     function setclicked(index){
        if(clicked[index]==0)
        {
            let clickedcl=clicked;
            clickedcl[index]=1;
            setIndexClicked(clicked => [...clicked, clickedcl]);
        }
    }
    return(
        <div className={classes.container}>
            <Location/>
            <div className={classes.Filter}>
                <ul>
                    {page[0].map((element,index) => {
                        return(
                            <div>
                                <li className={`${classes.FilterItem}`} >
                                    <NavLink to={element.route}  activeClassName={classes.activeLink}>
                                    <div>
                                        <div className={index==clicked? classes.clicked:classes.element} onClick={() =>setIndexClicked(index)}>{element.title}</div>
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