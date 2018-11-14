import React from "react";
import { Route, Redirect } from "react-router-dom";

import { withUserContext } from "./context/UserContext";

function Protectedroute({ token, component }) {
    return (
        token ? 
            <Route component={component}/>
            :
            <Redirect to="/login"/>
    )
}

export default withUserContext(Protectedroute); 