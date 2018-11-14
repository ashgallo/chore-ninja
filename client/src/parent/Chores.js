import React from "react";
import Navbar from "../Navbar";
import CheckUser from '../CheckUser';
import { withUserContext } from '../context/UserContext';

function Chores({ user }) {
    return (
        <CheckUser user={user} role="parent">
            <Navbar />
            Parent Chores
        </CheckUser>
    )
}

export default withUserContext(Chores);