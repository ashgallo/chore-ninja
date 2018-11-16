import React, { Component, createContext } from "react";
import axios from "axios";

const choreAxios = axios.create({
    transformRequest: [data => {
        const formData = new FormData();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key])
            }
        };
        return formData;
    }]
});

const choreUrl = "/api/chores"

choreAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const ChoreData = createContext();

export default class ChoreContext extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            err: null,
            chores: []
        }
    };

    blobify = (url) => {
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return fetch(url, options)
            .then(res => res.blob()).then(blob => URL.createObjectURL(blob))
    }
    getChores = () => {
        return choreAxios.get(choreUrl)
            .then(async response => {
                const chores = await Promise.all(response.data.map(chore => this.blobify(`/api/chores/images/${chore.image.filename}`)
                    .then(src => ({ ...chore, image: { ...chore.image, src } }))))

                this.setState({ chores });
                return response;
            })
    };
    addChore = (newChore, cb) => {
        return choreAxios.post(choreUrl, newChore)
            .then(async response => {
                const chore = response.data;
                const src = await this.blobify(`/api/chores/images/${chore.image.filename}`);
                chore.image.src = src;
                this.setState(prevState => {
                    return { chores: [...prevState.chores, chore] }
                });
                return response;
            }, cb);
    };
    editChore = (choreId, editedChore) => {
        return choreAxios.put(`${choreUrl}/${choreId}`, editedChore)
            .then( async response => {
                const updatedChore = response.data;
                const src = await this.blobify(`/api/chores/images/${updatedChore.image.filename}`);
                updatedChore.image.src = src;
                this.setState(prevState => {
                    const updatedChores = prevState.chores.map(chore => {
                        return chore._id === choreId ? updatedChore : chore
                    });
                    return { chores: updatedChores }
                });
                return response;
            })
    };
    deleteChore = (choreId) => {
        return choreAxios.delete(`${choreUrl}/${choreId}`)
            .then(response => {
                this.setState(prevState => {
                    const updatedChores = prevState.chores.filter(chore => {
                        return chore._id !== choreId
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
            <ChoreData.Provider value={props}>
                {this.props.children}
            </ChoreData.Provider>
        )
    }
};

export const withChoreContext = C => props => (
    <ChoreData.Consumer>
        {value => <C {...value} {...props} />}
    </ChoreData.Consumer>
);