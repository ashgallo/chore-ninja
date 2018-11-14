import React from "react";
import NotAuthorized from './NotAuthorized';

function CheckParent({ user, children, role }) {
    return (
        user.role === role ?
            children
            :
            <NotAuthorized />
    )
}

export default CheckParent;