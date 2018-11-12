import React, { Component, createContext } from "react";
import axios from "axios";

const choreAxios = axios.create();
const choreUrl = "/api/chores"

choreAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const ChoreContext = createContext();

export default class ChoreContext extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
            err: null,
            chores: []
        }
    };

    getChores = () => {
        return choreAxios.get(choreUrl)
            .then(response => {
                this.setState({ chores: response.data });
                return response;
            })
    };
    // TODO: Add callback function to params so that a clear inputs function can be called later
    addChore = (newChore) => {
        return choreAxios.post(choreUrl, newChore)
            .then(response => {
                this.setState(prevState => {
                    return { chores: [...prevState.chores, response.data] }
                });
                return response;
            });
    };
    editChore = (choreId, editedChore) => {
        return choreAxios.put(`${choreUrl}/${choreId}`, editedChore)
            .then(response => {
                this.setState(prevState => {
                    const updatedChores = prevState.chores.map(chore => {
                        chore._id === choreId ? response.data : chore
                    });
                    return { chores: updatedChores }
                });
                return response;
            });
    };
    deleteChore = (choreId) => {
        return choreAxios.delete(`${choreUrl}/${choreId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedChores = prevState.chores.filter(chore => {
                        chore._id !== choreId
                    });
                    return { chores: updatedChores }
                });
                return response;
            });
    };

    render() {
        const props = {
            ...this.state,
            getChores: this.getChores,
            addChore: this.addChore,
            editChore: this.editChore,
            deleteChore: this.deleteChore
        }
        return (
            <ChoreContext.Provider value={props}>
                {this.props.children}
            </ChoreContext.Provider>
        )
    }
};

export const withChoreContext = C => props => (
    <ChoreContext.Consumer>
        {value => <C {...value} {...props} />}
    </ChoreContext.Consumer>
);