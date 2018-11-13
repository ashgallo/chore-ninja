import React, { Component, createContext } from "react";

// import TimerView from './TimerView';

const TimerData = createContext();

export default class TimerContext extends Component {
    constructor(){
        super();
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

export const withTimerContext = C => props => (
    <TimerData.Consumer>
        {value => <C {...value} {...props} />}
    </TimerData.Consumer>
)

// render() {
//     const { isRunning, timeElapsed } = this.state;
//     return (
//         <div>
//             <TimerView timeElapsed={timeElapsed} isRunning={isRunning} toggle={this.toggle} reset={this.reset}/>
//         </div>
//     )
// }