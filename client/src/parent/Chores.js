import React from "react";
import Navbar from "../Navbar";
import Form from '../Form';
import CheckUser from '../CheckUser';
import { withUserContext } from '../context/UserContext';

function Chores({ user }) {
    return (
        <CheckUser user={user} role="parent">
            <Navbar />
            <Form />
            <h1> Create Chores</h1>
        </CheckUser>
    )
}

export default withUserContext(Chores);