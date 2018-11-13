import React, { Component, createContext } from "react";

import { withChoreContext } from "./ChoreContext";

const TimerData = createContext();

class TimerContext extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            timeElapsed: 0
        }
    }

    toggle = () => {
        this.setState({ isRunning: !this.state.isRunning}, () => {
            this.state.isRunning ? 
                this.startTimer()
                :
                clearInterval(this.timer)
        })
    }

    reset = () => {
        clearInterval(this.timer);
        this.setState({
            isRunning: false,
            timeElapsed: 0
        })
    }

    startTimer = () => {
        this.startTime = Date.now();
        this.timer = setInterval(this.update, 10);
    }

    update = () => {
        const delta = Date.now() - this.startTime;
        this.setState({
            timeElapsed: this.state.timeElapsed + delta
        })
        this.startTime = Date.now()
    }

    render() {
        const props = {
            ...this.state,
            toggle: this.toggle,
            reset: this.reset
        }
        return(
            <TimerData.Provider value={props}>
                {this.props.children}
            </TimerData.Provider>
        )
    }
}

export default withChoreContext(TimerContext);

export const withTimerContext = C => props => (
    <TimerData.Consumer>
        {value => <C {...value} {...props} />}
    </TimerData.Consumer>
)