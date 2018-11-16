import React, { Component, createRef } from "react"

import { withUserContext } from "./context/UserContext";
import { withRewardContext } from "./context/RewardContext";

import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add";

class RewardForm extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            points: "",
            restrictedTo: "",
        }
        this.uploader = createRef();
    }

    clearInputs = () => {
        this.setState({
            name: "",
            points: "",
            restrictedTo: ""
        })
    };
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    };
    handleSubmit = e => {
        e.preventDefault();
        const reqBody = { ...this.state, image: this.uploader.current.files[0] }
        this.props.addReward(reqBody, this.clearInputs);
    };

    render() {
        const restrictedToRadios = this.props.user.kids.map(kid => (
            <label key={kid._id} style={styles.label}>
                {kid.username}
                <input onChange={this.handleChange} name="restrictedTo" type="radio" value={kid._id} checked={this.state.restrictedTo === kid._id} style={styles.radio}></input>
            </label>
        ))

        return (
            <form onSubmit={this.handleSubmit} style={styles.container}>
                <div style={styles.row1}>
                    <label style={styles.label}>Reward:</label>
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} style={styles.input}></input>

                    <label style={styles.label}>Points:</label>
                    <input name="points" type="number" value={this.state.points} onChange={this.handleChange} style={styles.input}></input>
                    
                    <label style={styles.label}>Image:</label>
                    <input ref={this.uploader} name="image" type="file" style={styles.input}/>
                </div>

                <div styles={styles.row2}>
                    <label style={styles.label}>Restrict To:</label>
                    {restrictedToRadios}
                </div>
                <Button  type="submit" variant="fab" style={styles.button} aria-label="Add">
                    <AddIcon fontSize="large" />
                </Button>
            </form>
        )
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    label: {
        margin: '10px',
        fontFamily: 'Acme, sans-serif',
        fontSize: '25px',
        color: "#373738",
    },
    input: {
        height: '20px',
        width: '100px'
    },
    radio: {
        marginLeft: '8px'
    },
    row1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        margin: '10px'
    },
    row2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
    },
    row3: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
    },
    button: {
        color: '#f2f2f2',
        backgroundColor: '#EB3460',
        margin: '10px'
    }
  }

export default withRewardContext(withUserContext(RewardForm));