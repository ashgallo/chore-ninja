import { Component } from "react";

export default class FormContainer extends Component {
    constructor(props){
        super(props);
        this.state = props.inputs
    };

    handleChange = ({ target: { name, value }}) => {
        this.setState({ [name]: value })
    };
 
    clearInputs = () => {
        this.setState(prevState => {
            let newState = {}
            for(let key in prevState) {
                newState[key] = ""
            }
            return newState;
        }) 
    };

    render() {
        const props = {
            inputs: this.state,
            handleChange: this.handleChange,
            clearInputs: this.clearInputs
        }

        return (
            this.props.children(props)
        )
    };
};