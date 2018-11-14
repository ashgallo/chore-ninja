import React, { Component, createContext } from "react";

import { withRouter } from "react-router-dom";

import { withChoreContext } from "../context/ChoreContext";
import { withRewardContext } from "../context/RewardContext";

import axios from "axios";
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const UserData = createContext();

class UserContext extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }

    componentDidMount() {
        userAxios.get("/auth/verify")
            .then(this.props.getChores())
            .then(this.props.getRewards())
    }

    signup = (userInfo) => {
        return e => {
            e.preventDefault()
            axios.post("/auth/signup", userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                this.setState({
                    user,
                    token
                })
                return response.data.user.role
            })
            .then((role) => this.props.history.push(`/${role}/dashboard`))
        }   
    };
    login = (credentials) => {
        return e => {
            e.preventDefault();
            axios.post("/auth/login", credentials)
                .then(response => {
                    let { token, user } = response.data;
                    localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user))
                    this.setState({
                        user,
                        token,
                    })
                    this.props.getChores()
                    this.props.getRewards()
                    this.props.history.push(`/${user.role}/dashboard`)
                    return response;
                })
        }
    };
    logout = () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            this.setState({
                user: {},
                token: ""
            });
    };

    render() {
        const props = {
            ...this.state,
            signup: this.signup,
            login: this.login,
            logout: this.logout
        }
        return (
            <UserData.Provider value={props}>
                {this.props.children}
            </UserData.Provider>
        )
    };
};

export default withRouter(withChoreContext(withRewardContext(UserContext)));

export const withUserContext = C => props => (
    <UserData.Consumer>
        {value => <C {...value} {...props} />}
    </UserData.Consumer>
)