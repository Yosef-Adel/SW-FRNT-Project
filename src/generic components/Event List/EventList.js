import React from "react";
import EventCard from "../event card/EventCard";
import eventImage1 from "../../assets/imgs/events/event1.png";
import eventImage2 from '../../assets/imgs/events/event2.png';
import classes from "./eventList.module.css";

const CardInfo = [{
    id:0,
    img:eventImage1,
    title:"Celebrating Century : Presidency University",
    time:"Tue, Mar 14, 7:00 PM + 37 more events",
    location:"Crowne Plaza - West Cairo Hotel",
    price:"Free",
    companyName:"Presidency University",
    followersNo:"100"},
    
    {
    id:1,
    img:eventImage1,
    title:"Borcelle's food truck festival",
    time:"Tue, Oct 14, 7:00 PM",
    location:"Presidency University, Kolkata",
    price:"Free",
    companyName:"Borcelle Community",
    followersNo:"50"},
    {
    id:2,
    img:eventImage1,
    title:"Event 3",
    time:"Tue, Oct 14, 7:00 PM",
    location:"Presidency University, Kolkata",
    price:"Free",
    companyName:"Borcelle Community",
    followersNo:"50"},
    {
    id:3,
    img:eventImage2,
    title:"Event 4",
    time:"Tue, Oct 14, 7:00 PM",
    location:"Presidency University, Kolkata",
    price:"Free",
    companyName:"Borcelle Community",
    followersNo:"50"},
    {
    id:4,
    img:eventImage2,
    title:"Event 5",
    time:"Tue, Oct 14, 7:00 PM",
    location:"Presidency University, Kolkata",
    price:"Free",
    companyName:"Borcelle Community",
    followersNo:"50"}
]

const EventList = () => {
    return (
        <div>
            <div className={classes.secheader}>
                    <h3>Events in Al Qahirah</h3>
                </div>
            <div className={classes.list}>
                
                {
                CardInfo.map((card)=>
                <EventCard key = {card.id} img = {card.img} title = {card.title} time = {card.time} location = {card.location} price = {card.price} companyName = {card.companyName} followersNo = {card.followersNo} />)
                }</div>
                <div className={classes.moreBtn}>
                <button type="button">See more</button>
            </div>
          </div>
        );
};

export default EventList;