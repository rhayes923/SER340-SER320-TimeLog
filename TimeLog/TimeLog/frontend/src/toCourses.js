import React, { Component } from 'react';
import { useParams } from 'react-router-dom'
import CoursesPage from './coursesPage'


const ToCourses = (props) => {
        const { userID } = useParams();
        return (
        <div>
        <CoursesPage userID={userID}/>
        </div>)
}
 
export default ToCourses;