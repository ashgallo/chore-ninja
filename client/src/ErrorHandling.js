import React from "react";

function ErrorHandling({ err, children }) {
    return (
        err ?
            <div>{err}</div>
            :
            children
    )
}

export default ErrorHandling;