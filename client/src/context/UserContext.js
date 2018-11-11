import React, { Component, createContext } from "react";
import axios from "axios";

// TODO: Create user axios instance
// TODO: Create interceptor

const UserData = createContext();

export default class UserContext extends Component {
    constructor(){
        super();
        this.state = {
            // TODO: create state
        }
    }

    login = () => {

    }

    render() {
        // TODO: bring other methods into props once written
        const props = {
            ...this.state,
            login: this.login
        }
        return (
            <UserData.Provider value={props}>
                {this.props.children}
            </UserData.Provider>
        )
    }
}

export const withUserContext = C => props => (
    <UserData.Consumer>
        {value => <C {...value} {...props} />}
    </UserData.Consumer>
)