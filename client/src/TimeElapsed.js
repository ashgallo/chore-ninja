import React, { Component } from "react";

export default class TimeElapsed extends Component {
    getUnits = () => {
        const seconds = this.props.timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        }
    }

    render() {
        const units = this.getUnits();

        return (
            <div>
                <span>{units.min.length < 2 ? `0${units.min}` : units.min}:</span>
                <span>{units.sec.length < 2 ? `0${units.sec}` : units.sec}.</span>
                <span>{units.msec}</span>
            </div>
        )
    }
}