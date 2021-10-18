import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PhotoPath: variables.PHOTO_URL
        }
    }

    render() {
        const {
            PhotoPath,
        } = this.state;
        return (
            <div>
                <br />
                
                <div>
                    <img width="1300px" height="700px" align="left" src={PhotoPath + 'home.png'} />  
                </div>
                
            </div>
        )
    }
}