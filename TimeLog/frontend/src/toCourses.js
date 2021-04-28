import React, { Component } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from './navbar'
import CoursesPage from './coursesPage'


const ToCourses = (props) => {
        const { userID } = useParams();
        return (
        <div>
        <Navbar />
        <CoursesPage userID={userID}/>
        </div>)
}
 
export default ToCourses;