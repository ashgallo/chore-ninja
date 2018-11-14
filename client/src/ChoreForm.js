import React, { createRef } from 'react';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
import FormContainer from './FormContainer';
import Button from '@material-ui/core/Button';

function ChoreForm({ user, addChore, handleChange, clearInputs, inputs }) {
  this.uploader = createRef()
  const selectCategory = []
  const categoryOptions = selectCategory.map((category, i) => (
    <option name={category} value={selectCategory[i]} key={i}>{selectCategory[i]}</option>
  ))
  const assigneeRadios = user.kids.map(kid => (
    <input key={kid} name="assignedTo" type="radio" value={kid} checked={assignedTo === kid}/>
  ))

  return (
    <FormContainer inputs={{
      category: "",
      name: "",
      description: "",
      points: "",
      assignedTo: "",
      image: ""
      }}>
      <h1>Create Chores</h1>
      <form onSubmit={addChore(inputs, clearInputs)}>
        <div>
          <label>Category:</label>
          <select onChange={handleChange}>
            <option value="category"></option>
            {categoryOptions}
          </select>

          <label>Chore:</label>
          <input name="name" type="text" value={inputs.name} onChange={handleChange} />

          <label>Description:</label>
          <input name="description" type="text" value={inputs.description} onChange={handleChange} />
        </div>

        <div>
          <label>Points:</label>
          <input name="points" type="number" value={inputs.points} onChange={handleChange} />

          <label>Image:</label>
          
          <input ref={this.uploader} name="image" type="file" value={inputs.image} onChange={handleChange} />
        </div>

        <div>
          <label>{assignedTo}</label>
          <input name="assignedTo" type="radio" value={inputs.assignedTo} onChange={handleChange} checked={inputs.assignedTo === assignedTo} />
          {assigneeRadios}
        </div>

        <Button type="submit" variant='contained' style={styles.button}></Button>
      </form>
    </FormContainer>
  )   
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