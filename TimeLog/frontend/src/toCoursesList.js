import React, { Component } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from './navbar'
import CoursesList from './coursesList'


const ToCoursesList = (props) => {
        const { userID } = useParams();
        return (
        <div>
        <Navbar />
        <CoursesList userID={userID}/>
        </div>)
}
 
export default ToCoursesList;