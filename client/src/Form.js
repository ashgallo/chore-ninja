import React, { Component, createRef } from 'react';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      category: "kitchen",
      name: "",
      description: "",
      points: "",
      assignedTo: "",
    };
    this.uploader = createRef();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  };

  // handleSubmit = ({ ...this.state, image: this.uploader.current.files[0]}) => {
  //   this.setState({ [name]: value })
  // };
  handleSubmit = e => {
    e.preventDefault();
    const reqBody = { ...this.state, image: this.uploader.current.files[0] }
    this.props.addChore(reqBody)
  };

  clearInputs = () => {
    this.setState(prevState => {
      let newState = {}
      for (let key in prevState) {
        newState[key] = ""
      }
      return newState;
    });
  }

  render() {
    const selectCategory = ["kitchen", "pets", "bathroom", "bedroom", "livingroom", "yard", "laundry", "other"]

    const categoryOptions = selectCategory.map((category, i) => (
      <option value={category} key={i}>{category}</option>
    ))

    const assigneeRadios = this.props.user.kids.map(kid => (
      <label key={kid._id}>
        {kid.username}
        <input onChange={this.handleChange} name="assignedTo" type="radio" value={kid._id} checked={this.state.assignedTo === kid._id} />
      </label>
    ))
    return (
      <form onSubmit={this.handleSubmit} style={styles.container}>
        <div style={styles.row1}>
          <label style={styles.label}>Category:</label>
          <select onChange={this.handleChange} name="category" value={this.state.category}>
            {categoryOptions}
          </select>

          <label style={styles.label}>Chore:</label>
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />

          <label style={styles.label}>Description:</label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
        </div>

        <div style={styles.row2}>
          <label style={styles.label}>Points:</label>
          <input name="points" type="number" value={this.state.points} onChange={this.handleChange} />

          <label style={styles.label}>Image:</label>
          <input ref={this.uploader} name="image" type="file" />
        </div>

        <div style={styles.row3}>
          {/* <input name="assignedTo" type="radio" value={this.state.assignedTo} onChange={this.handleChange} checked={this.assignedTo === {assigneeRadios}} /> */}
          {assigneeRadios}
        </div>

        <div style={styles.column2}>
          <Button type="submit" variant='contained' style={styles.button}>Add</Button>
        </div>
      </form>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '.5fr 1fr 1fr .5fr',
    gridGap: '10px',
    margin: '10px'
  },
  label: {
    margin: '10px'
  },
  row1: {
    display: 'flex',
    justifyContent: 'center',
    gridColumnStart: 2,
    gridColumnEnd: 4,
    gridRowStart: 1,
    gridRowEnd: 2,
  },
  row2: {
    display: 'flex',
    justifyContent: 'center',
    gridColumnStart: 2,
    gridColumnEnd: 4,
    gridRowStart: 2,
    gridRowEnd: 3,
  },
  row3: {
    display: 'flex',
    justifyContent: 'center',
    gridColumnStart: 2,
    gridColumnEnd: 4,
    gridRowStart: 3,
    gridRowEnd: 4,
  },
  column2: {
    gridColumnStart: 4,
    gridColumnEnd: 5,
    gridRowStart: 1,
    gridRowEnd: 3,
  },
  button: {
    backgroundColor: '#EB3460',
    color: '#f2f2f2',
    width: '100px',
    height: '20px',
    margin: '10px'
  }
}

export default withChoreContext(withUserContext(Form));