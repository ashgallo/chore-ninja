import React from "react";
import { Link } from "react-router-dom";

import { withUserContext } from "./context/UserContext";
import FormContainer from './FormContainer';
import SignupForm from './SignupForm';

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
        fontSize: "2.5em"
    },
    login: {
        fontFamily: 'Acme, sans-serif',
        fontSize: '20px',
        color: '#373738',
    },
    Button: {
        backgroundColor: "#EB3460",
        width: "100px",
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
        right: "0",
        marginRight: "10px"
    }
}

function SignupPage({ signup }) {
    return (
        <div className="signup-page-container" style={styles.page} >
            <h1 style={styles.header}>CHORE NINJA</h1>
            <FormContainer inputs={{
                username: "",
                password: "",
                role: ""
            }}>
                {props => (
                    <SignupForm {...props} handleSubmit={signup}/>
                )}
            </FormContainer>
            <h3 style={styles.login}>Already have an account?</h3>
            <Button variant="contained" style={styles.Button}>
                <Link to="/login" style={styles.Link}>Login</Link>
            </Button>
            <img src={ninjaHome} alt="" style={styles.imgContainer} />
        </div>
    )
}

export default withUserContext(SignupPage);