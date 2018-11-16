import React from "react";

import Button from "@material-ui/core/Button";

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        width: "75%",
        marginBottom: "50px",
    },
    label: {
        fontFamily: 'Acme, sans-serif',
        fontSize: '20px',
        color: '#373738',
    },
    input: {
        border: "none",
        borderBottom: " 2px solid #282828",
        backgroundColor: "#5ECFA1",
        paddingTop: "20px",
        marginBottom: "40px",
        width: "100%",
        fontSize: "1em",
        outlineColor: "#0F52BA"
    },
    loginButton: {
        fontFamily: 'Acme, sans-serif',
        fontSize: '20px',
        color: '#373738',
        backgroundColor: '#fff8ac',
        width: "100px",
        height: "20px",
        alignSelf: "center"
    }
}

function LoginForm({ handleSubmit, clearInputs, handleChange, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs, clearInputs)} className="login-form" style={styles.form}>
            <label style={styles.label}>Username</label>
            <input onChange={handleChange} name="username" value={inputs.username} type="text" style={styles.input}/>

            <label style={styles.label}>Password</label>
            <input onChange={handleChange} name="password" value={inputs.password} type="password" style={styles.input}/>

            <Button type="submit" variant="contained" style={styles.loginButton}>LOGIN</Button>
        </form>
    )
}

export default LoginForm;