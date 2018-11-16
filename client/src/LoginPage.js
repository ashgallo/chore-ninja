import React from "react";
import { Link } from "react-router-dom";

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
        fontSize: "2.5em",
        fontFamily: 'Acme, sans-serif',
        color: '#373738',
    },
    Button: {
        backgroundColor: "#EB3460",
        width: "120px",
        height: "20px",
        fontFamily: 'Acme, sans-serif',
        fontSize: '20px',
        color: '#373738',
    },
    Link: {
        color: "#f2f2f2",
        textDecoration: "none"
    },
    imgContainer: {
        position: "fixed",
        bottom: "0",
        left: "0",
        marginLeft: "10px"
    },
    account: {
        fontFamily: 'Acme, sans-serif',
        fontSize: '20px',
        color: '#373738',
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
            <h3 style={styles.account}>Don't have an account?</h3>
            <Button variant="contained" style={styles.Button}>
                <Link to="/signup" style={styles.Link}>Sign Up</Link>
            </Button>
            <img src={ninjaHome} alt="" style={styles.imgContainer} />
        </div>
    )
}

export default withUserContext(LoginPage);