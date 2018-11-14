import React from "react";

import Navbar from "../Navbar";
import CheckUser from '../CheckUser';
import { withUserContext } from '../context/UserContext';

function Rewards({ user }) {
    return (
        <CheckUser user={user} userRole="parent">
            <Navbar />
            Parent Rewards
        </CheckUser>
    )
}

export default withUserContext(Rewards);