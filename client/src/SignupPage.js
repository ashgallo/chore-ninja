import React from "react";

import { withUserContext } from "./context/UserContext";
import FormContainer from './FormContainer';
import SignupForm from './SignupForm';

import ninjaHome from "./assets/img/ninjaHome.png";

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
            <img src={ninjaHome} alt="" style={styles.imgContainer} />
        </div>
    )
}

export default withUserContext(SignupPage);