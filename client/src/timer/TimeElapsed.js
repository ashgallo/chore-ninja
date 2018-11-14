import React from "react";

function TimeElapsed({ timeElapsed }) {
    const getUnits = () => {
        const seconds = timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        }
    }

    const units = getUnits();

    return (
        <div>
            <span>{units.min.length < 2 ? `0${units.min}` : units.min}:</span>
            <span>{units.sec.length < 2 ? `0${units.sec}` : units.sec}.</span>
            <span>{units.msec}</span>
        </div>
    )
}

export default TimeElapsed;