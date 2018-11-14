import React from "react";

import Button from "@material-ui/core/Button";

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        width: "75%",
        marginBottom: "50px"
    },
    label: {
        color: "#606060"
    },
    radioContainerLabel: {
        alignSelf: "center",
        color: "#606060"
    },
    radioLabel: {
        margin: "10px"
    },
    input: {
        border: "none",
        borderBottom: " 2px solid #282828",
        paddingTop: "20px",
        marginBottom: "40px",
        width: "100%",
        fontSize: "1em",
        backgroundColor: "#5ECFA1",
        outlineColor: "#0F52BA"
    },
    signupButton: {
        backgroundColor: "#0F52BA",
        width: "100px",
        height: "20px",
        alignSelf: "center",
        marginTop: "10px",
        zIndex: "100"
    },
    radioContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "#606060"
    }
}

function SignupForm({ handleSubmit, handleChange, clearInputs, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs, clearInputs)} className="signup-form" style={styles.form}>
            <label style={styles.label}>New Username</label>
            <input onChange={handleChange} name="username" value={inputs.username} type="text" style={styles.input}/>

            <label style={styles.label}>New Password</label>
            <input onChange={handleChange} name="password" value={inputs.password} type="password" style={styles.input}/>

            <label style={styles.radioContainerLabel}>Signing up as a...</label>
            <div style={styles.radioContainer}>
                <label style={styles.radioLabel}>
                    <input onChange={handleChange} name="role" value="parent" type="radio" checked={inputs.role === "parent"}/>
                    Parent
                </label>
                <label style={styles.radioLabel}>
                    <input onChange={handleChange} name="role" value="child" type="radio" checked={inputs.role === "child"}/>
                    Child
                </label>
            </div>
            <Button type="submit" variant="contained" style={styles.signupButton}>SIGN UP!</Button>
        </form>
    )
}

export default SignupForm;