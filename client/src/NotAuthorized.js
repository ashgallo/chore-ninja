import React from "react";
import notAuthorized from "./assets/img/NotAuthorized.png";

function NotAuthorized() {
    return (
        <div style={styles.container}>
            <div style={styles.div}>Not Authorized to View This Page</div>
            <img style={styles.img} src={notAuthorized} alt=""/>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    img: {
        width: "50%",
        height: "50%"
    },
    div: {
        color: "darkred",
        fontSize: "3em",
        textAlign: "center"
    }
}

export default NotAuthorized;