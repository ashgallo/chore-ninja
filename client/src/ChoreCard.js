import React from 'react';
import { withRouter } from 'react-router-dom';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
//import Timer from './Timer';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ChoreCard({ user, chores, loading, err, location, deleteChore, editChore, info: {_id, category, name, description, timeElapsed, completed, assignedTo, submitted, points, image} }) {

  return (
    <div style={styles.card}>
      <img src={image.src} alt="" style={styles.image} />
      <h1>{name}</h1>
      <h4>{description}</h4>
      <h4>{points}</h4>
      <h4>{user.username}</h4>
      <IconButton onClick={() => editChore(_id)}><EditIcon /></IconButton>
      <IconButton onClick={() => deleteChore(_id)}><DeleteIcon /></IconButton>
    </div>
  )
}

const styles = {
  card: {
    width: '15vw',
    borderRadius: '10px',
    padding: '10;px',
    backgroundColor: '#fff8ac',
    fontFamily: 'Acme, sans-serif',
    fontSize: '20px',
    color: "#373738",
  },
  image: {
    width: '200px',
    height: 'auto',
    alignItem: 'center'
  }
}

export default withRouter(withChoreContext(withUserContext(ChoreCard)));
