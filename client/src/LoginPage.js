import React from "react";

import { withUserContext } from "./context/UserContext";
import FormContainer from './FormContainer';
import LoginForm from './LoginForm';

import ninjaHome from "./assets/img/ninjaHome.png";

import Button from "@material-ui/core/Button";

const styles = {
    page: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#5ECFA1"
    },
    header: {
        fontSize: "3em"
    },
    Button: {
        backgroundColor: "#EB3460",
        color: "#f2f2f2",
        width: "100px",
        height: "20px"
    },
    imgContainer: {
        position: "fixed",
        bottom: "0",
        left: "0",
        marginLeft: "10px"
    }
}

function LoginPage({ login }) {
    return (
        <div className="login-page-container" style={styles.page}>
            <h1 style={styles.header}>CHORE NINJA</h1>
            <FormContainer inputs={{
                username: "",
                password: ""
            }}>
                {props => (
                    <LoginForm {...props} handleSubmit={login}/>
                )}
            </FormContainer>
            <h3>Don't have an account?</h3>
            <Button variant="contained" style={styles.Button}>Sign Up</Button>
            <img src={ninjaHome} style={styles.imgContainer} alt=""/>
        </div>
    )
}

export default withUserContext(LoginPage);