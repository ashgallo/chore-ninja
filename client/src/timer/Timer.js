import React from "react";

import { withTimerContext } from "../context/TimerContext";
import TimeElapsed from './TimeElapsed';

import Button from "@material-ui/core/Button";

const styles = {
    page: {
        display: "flex",
        justifyContent: "center",
        color: "#303030"
    },
    container: {
        width: "75%",
        textAlign: "center",
        border: "2px solid #5ECFA1",
        paddingTop: "5px",
        backgroundColor: "#f2f2f2"
    },
    timerButton: {
        backgroundColor: "#F8DE4B",
        margin: "5px",
        width: "100px"
    },
    resetButton: {
        backgroundColor: "#FF8900",
        margin: "5px",
        width: "100px"
    }
}

function Timer({ timeElapsed, isRunning, toggle, complete, choreId }) {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <TimeElapsed timeElapsed={timeElapsed}/>
                <Button onClick={toggle} variant="contained" style={styles.timerButton}>{isRunning ? "Stop" : "Start"}</Button>
                <Button onClick={complete(choreId)} disabled={timeElapsed === 0 || isRunning} variant="contained" style={styles.resetButton}>COMPLETE</Button>
            </div>
        </div>
        
    )
}

export default withTimerContext(Timer);