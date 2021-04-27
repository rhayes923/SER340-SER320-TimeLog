import React, { Component } from 'react';
import Navbar from './navbar'

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <Navbar />
        </div> );
    }
}
 
export default StudentPage;