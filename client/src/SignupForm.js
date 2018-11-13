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
    input: {
        border: "none",
        borderBottom: " 2px solid #282828",
        paddingTop: "20px",
        marginBottom: "40px",
        width: "100%",
        fontSize: "1em",
        outlineColor: "#0F52BA"
    },
    signupButton: {
        backgroundColor: "#0F52BA",
        width: "100px",
        height: "20px",
        alignSelf: "center"
    }
}

function SignupForm({ handleSubmit, handleChange, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs)} className="signup-form" style={styles.form}>
            <label style={styles.label}>New Username</label>
            <input onChange={handleChange} name="username" value={inputs.username} type="text" style={styles.input}/>

            <label style={styles.label}>New Password</label>
            <input onChange={handleChange} name="password" value={inputs.password} type="password" style={styles.input}/>

            <label style={styles.label}>Signing up as a...</label>
            <label style={styles.label}>
                <input onChange={handleChange} name="role" value={inputs.usertype} type="radio"/>
                Parent
            </label>
            <label style={styles.label}>
                <input onChange={handleChange} name="role" value={inputs.usertype} type="radio"/>
                Child
            </label>

            <Button type="submit" variant="contained" style={styles.signupButton}>SIGN UP!</Button>
        </form>
    )
}

export default SignupForm;