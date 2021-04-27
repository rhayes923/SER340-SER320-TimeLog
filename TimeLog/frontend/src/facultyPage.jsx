import React, { Component } from 'react';
import Navbar from './navbar'

class FacultyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <Navbar {...this.props}/>
        </div> );
    }
}
 
export default FacultyPage;