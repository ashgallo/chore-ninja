import React from "react";

import Button from "@material-ui/core/Button";

function SignupForm({ handleSubmit, handleChange, inputs }) {
    return (
        <form onSubmit={handleSubmit(inputs)} className="signup-form">
            <label>New Username</label>
            <input onChange={handleChange} name="username" value={inputs.username} type="text"/>

            <label>New Password</label>
            <input onChange={handleChange} name="password" value={inputs.password} type="password"/>

            <Button type="submit" variant="contained">SIGN UP!</Button>
        </form>
    )
}

export default SignupForm;