import React from "react";

import Button from "@material-ui/core/Button";

function AddKidForm({ handleSubmit, clearInputs, handleChange, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs, clearInputs)} style={styles.form}>
            <label>
                Add Kid (username):
                <input onChange={handleChange} name="kid" value={inputs.kid} type="text" style={styles.input}/>
            </label>
            <Button type="submit" variant="contained" style={styles.button}>Add</Button>
        </form>
    )
}

const styles = {
    form: {
        display: "flex",
        alignItems: "center"
    },
    input: {
        margin: "0 10px",
        height: "30px"
    },
    button: {
        backgroundColor: "#0072a3",
        color: "#f2f2f2",
        width: "100px",
        height: "20px",
      }
}

export default AddKidForm;