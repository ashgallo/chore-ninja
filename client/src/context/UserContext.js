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
            user: {},
            token: localStorage.getItem("token") || "",
        }
    }

    async getUser() {
        const user = await userAxios.get("/auth/verify")
            .then(response => response.data);
        const kids = await this.getKids()
        user.kids = kids;
        this.setState({ user })
    };
    async getKids() {
        return userAxios.get("/auth/getKids")
            .then(response => response.data)
    };
    addKid = (inputs, cb) => {
        return async e => {
            e.preventDefault();
            const kidUsernames = this.state.user.kids.map(kid => kid.username);
            if (kidUsernames.includes(inputs.kid)) {
                alert('There is a glitch in the Matrix...');
            } else {
                kidUsernames.push(inputs.kid);
                const user = await userAxios.put(`/auth/${this.state.user._id}/addKid`, { kids: kidUsernames })
                    .then(response => response.data)
                const kids = await this.getKids();
                user.kids = kids;
                this.setState({ user }, cb);
            }
        }
    };
    signup = (userInfo) => {
        return e => {
            e.preventDefault()
            axios.post("/auth/signup", userInfo)
                .then(response => {
                    const { user, token } = response.data
                    localStorage.setItem("token", token)
                    this.setState({
                        user,
                        token
                    })
                    return response.data.user.role
                })
                .then((role) => this.props.history.push(`/${role}/dashboard`))
        }
    };
    sendCredentials = credentials => axios.post("/auth/login", credentials)
            .then(response => response.data)

    login = (credentials) => {
        return async e => {
            e.preventDefault();
            const { user, token } = await this.sendCredentials(credentials);
            localStorage.setItem("token", token)
            const kids = await this.getKids();
            user.kids = kids;
            this.setState({
                user,
                token
            }, () => {
                this.props.getChores()
                this.props.getRewards()
                this.props.history.push(`/${user.role}/dashboard`)
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

    componentDidMount() {
        this.getUser()
            .then(this.props.getChores())
            .then(this.props.getRewards())
    }

    render() {
        const props = {
            ...this.state,
            signup: this.signup,
            login: this.login,
            logout: this.logout,
            addKid: this.addKid
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