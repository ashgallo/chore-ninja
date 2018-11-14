import React from "react";

import ReactLoading from 'react-loader';

const styles = {
    page: {
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

function Loading({ loading, children }) {
    return (
        loading ?
            <div style={styles.page}>
                <ReactLoading type="bubbles" color="#F8DE4B" height="25%" width="25%" />
            </div>
            :
            children
    )
}

export default Loading;