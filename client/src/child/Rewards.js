import React from "react";

import { withUserContext } from "../context/UserContext";

import CheckUser from '../CheckUser';
import Navbar from "../Navbar";

function Rewards({ user }) {
    return (
        <CheckUser user={user} userRole="child">
            <Navbar />
            Child Rewards
        </CheckUser>
    )
}

export default withUserContext(Rewards);