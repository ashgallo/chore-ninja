import React, { Component, createRef } from 'react';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class ChoreForm extends Component {
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

  handleSubmit = e => {
    e.preventDefault();
    const reqBody = { ...this.state, image: this.uploader.current.files[0] }
    this.props.addChore(reqBody, this.clearInputs)
  };

  clearInputs = () => {
    this.setState({
      name: "",
      description: "",
      points: "",
      assignedTo: ""
    });
  }

  clearInputs = () => {
    this.setState({
        name: "",
        points: "",
        restrictedTo: ""
    })
};

  render() {
    const selectCategory = ["kitchen", "pets", "bathroom", "bedroom", "livingroom", "yard", "laundry", "other"]

    const categoryOptions = selectCategory.map((category, i) => (
      <option value={category} key={i} style={styles.dropdown}>{category}</option>
    ))

    const assigneeRadios = this.props.user.kids.map(kid => (
      <label key={kid._id} style={styles.assignedTo}>
        {kid.username}
        <input onChange={this.handleChange} name="assignedTo" type="radio" value={kid._id} checked={this.state.assignedTo === kid._id} style={styles.radio}/>
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
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} style={styles.input} />

          <label style={styles.label}>Description:</label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} style={styles.input} />
        </div>

        <div style={styles.row2}>
          <label style={styles.label}>Points:</label>
          <input name="points" type="number" value={this.state.points} onChange={this.handleChange} style={styles.input} />

          <label style={styles.label}>Image:</label>
          <input ref={this.uploader} name="image" type="file" style={styles.input} />
        </div>

        <div style={styles.row3}>
          {/* <input name="assignedTo" type="radio" value={this.state.assignedTo} onChange={this.handleChange} checked={this.assignedTo === {assigneeRadios}} /> */}
          {assigneeRadios}
        </div>

        <div style={styles.column4}>
          <IconButton type="submit" variant='contained' style={styles.button}><AddIcon fontSize='large' textAlign='center'/></IconButton>
        </div>
      </form>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '.5fr .3fr .3fr .5fr',
    gridGap: '10px',
    margin: '0px'
  },
  label: {
    margin: '10px',
    fontFamily: 'Acme, sans-serif',
    fontSize: '25px',
    color: "#373738",
  },
  dropdown: {
    margin: 0
  },
  assignedTo: {
    margin: '20px',
    color: '#373738',
  },
  radio: {
    marginLeft: 15
  },
  input: {
    height: '30px',
    width: '100px'
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
    fontFamily: 'Acme, sans-serif',
    fontSize: '25px',
    marginTop: '10px'
  },
  column4: {
    gridColumnStart: 4,
    gridColumnEnd: 5,
    gridRowStart: 2,
    gridRowEnd: 4,
    display: 'flex',
  },
  button: {
    backgroundColor: '#EB3460',
    color: '#f2f2f2',
    width: '50px',
    height: '50px',
    margin: 0
  }
}

export default withChoreContext(withUserContext(ChoreForm));