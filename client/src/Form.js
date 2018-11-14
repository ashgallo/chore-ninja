import React, { Component, createRef } from 'react';
import { withChoreContext} from './context/ChoreContext';
import { withUserContext} from './context/UserContext';
import Button from '@material-ui/core/Button';

class ChoreForm extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      category: "",
      name: "",
      description: "",
      points: "",
      assignedTo: "",
      image: ""
    };
    this.uploader = createRef();
  }

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;
    this.setState( {[name]: value});
  };

  handleSubmit(e) {
    e.preventDefault();
    const reqBody = {...this.state, image: this.uploader.current.files[0]}
    this.props.addChore(reqBody)
  };

  clearInputs = () => {
    this.setState(prevState => {
        let newState = {}
        for(let key in prevState) {
            newState[key] = ""
        }
        return newState;
    });
  }
   
// const selectCategory = []

// const categoryOptions = selectCategory.map((category, i) => (
//   <option name={category} value={selectCategory[i]} key={i}>{selectCategory[i]}</option>
// ))

// const assigneeRadios = user.kids.map(kid => (
//   <input key={kid} name="assignedTo" type="radio" value={kid} checked={this.assignedTo === kid}/>
// ))

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Category:</label>
          {/* <select onChange={this.handleChange}>
            <option value="category"></option>
            {categoryOptions}
          </select> */}

          <label>Chore:</label>
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />

          <label>Description:</label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
        </div>

        <div>
          <label>Points:</label>
          <input name="points" type="number" value={this.state.points} onChange={this.handleChange} />

          <label>Image:</label>
          <input ref={this.uploader} name="image" type="file" value={this.state.image} onChange={this.handleChange} />
        </div>

        <div>
          <label>{this.assignedTo}</label>
          {/* <input name="assignedTo" type="radio" value={this.state.assignedTo} onChange={this.handleChange} checked={this.assignedTo === this.assignedTo} />
          {assigneeRadios} */}
        </div>

        <Button type="submit" variant='contained' style={styles.button}>Add</Button>
      </form>
    )
  }
}
   
const styles = {
  button: {
    backgroundColor: "#EB3460",
    color: "#f2f2f2",
    width: "100px",
    height: "20px"
  }
}

export default withChoreContext(withUserContext(ChoreForm));