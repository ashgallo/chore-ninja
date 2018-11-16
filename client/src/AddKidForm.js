import React from "react";
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';

function AddKidForm({ handleSubmit, clearInputs, handleChange, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs, clearInputs)} style={styles.form}>
            <label >
                Add Child (username):
                <input onChange={handleChange} name="kid" value={inputs.kid} type="text" style={styles.input}/>
            </label>
            <IconButton type="submit" variant="contained" style={styles.button}><AddIcon /></IconButton>
        </form>
    )
}

const styles = {
    form: {
        display: "flex",
        alignItems: "center",
        fontFamily: 'Acme, sans-serif',
        fontSize: '15px'
    },
    input: {
        height: "30px",
        marginLeft: '10px'
    },
    button: {
        color: '#EB3460',
        width: '70px',
        height: '70px',
        borderRadius: '50px',
        margin: 0
      }
}

export default AddKidForm;