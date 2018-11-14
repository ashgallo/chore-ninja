import React from "react";

import { withUserContext } from "../context/UserContext"

import CheckUser from '../CheckUser';
import Navbar from "../Navbar";

function Chores({ user }) {
    return (
        <CheckUser user={user} userRole="child">
            <Navbar />
            Child Chores
        </CheckUser>
    )
}

export default withUserContext(Chores);