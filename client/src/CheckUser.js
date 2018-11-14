import React from "react";
import NotAuthorized from './NotAuthorized';

function CheckParent({ user, children, userRole }) {
    return (
        user.role === userRole ?
            children
            :
            <NotAuthorized />
    )
}

export default CheckParent;