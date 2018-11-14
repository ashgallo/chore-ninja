import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

import { withUserContext } from "./context/UserContext";

import Button from "@material-ui/core/Button";

const styles = {
    navContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    nav: {
        display: "flex",
        width: "100%"
    },
    LinkContainer: {
        margin: "10px"
    },
    Link: {
        textDecoration: "none"
    },
    Button: {
        backgroundColor: "#5ECFA1",
        justifySelf: "flexEnd",
        margin: "5px"
    }
}

function Navbar({ user, logout }) {
    return (
        <div style={styles.navContainer}>
            <nav style={styles.nav}>
                {
                    user.role === "parent" ? 
                        <Fragment>
                            <div style={styles.LinkContainer}>
                                <Link to="/parent/dashboard" style={styles.Link}>Dashboard</Link>
                            </div>
                            <div style={styles.LinkContainer}>
                                <Link to="/parent/chores" style={styles.Link}>Chores</Link>
                            </div>
                            <div style={styles.LinkContainer}>
                                <Link to="/parent/rewards" style={styles.Link}>Rewards</Link>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <div style={styles.LinkContainer}>
                                <Link to="/child/dashboard" style={styles.Link}>Dashboard</Link>
                            </div>
                            <div style={styles.LinkContainer}>
                                <Link to="/child/chores" style={styles.Link}>Chores</Link>
                            </div>
                            <div style={styles.LinkContainer}>
                                <Link to="/child/rewards" style={styles.Link}>Rewards</Link>
                            </div>
                        </Fragment>
                }
            </nav>
            <Button onClick={logout} variant="contained" style={styles.Button}>Logout</Button>
        </div>
        
        
    )
}

export default withUserContext(Navbar);