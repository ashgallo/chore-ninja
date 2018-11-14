import React, { Component, createContext } from "react";

import { withChoreContext } from "./ChoreContext";

const TimerData = createContext();

class TimerContext extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            timeElapsed: 0,
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

    complete = (choreId) => {
        const backToZero = () => {
            this.setState({
                isRunning: false,
                timeElapsed: 0
            })
        }
        return e => {
            this.props.editChore(choreId, {timeElapsed: this.state.timeElapsed, completed: true})
            .then(backToZero)
            .catch(backToZero)         
        }
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
            complete: this.complete
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