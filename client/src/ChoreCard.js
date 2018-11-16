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
      <h1 style={styles.name}>{name}</h1>
      <img src={image.src} alt="" style={styles.image} />
      <h4 style={styles.description}>{description}</h4>
      <h4 style={styles.points}>{points} Points</h4>
      <IconButton onClick={() => editChore(_id)} style={styles.edit}><EditIcon /></IconButton>
      <IconButton onClick={() => deleteChore(_id)} style={styles.delete}><DeleteIcon /></IconButton>
    </div>
  )
}

const styles = {
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '20vw',
    height: '25vw',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff8ac',
    fontFamily: 'Acme, sans-serif',
    color: "#373738",
    margin: '5px'
  },
  name: {
    fontSize: '18px'
  },
  image: {
    width: '200px',
    height: '150px',
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 3,
  },
  description: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 3,
    gridRowEnd: 4,
    fontSize: '15px'
  },
  points: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 4,
    gridRowEnd: 5,
    fontSize: '15px'
  },
  edit: {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 5,
    gridRowEnd: 6,
  },
  delete: {
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 5,
    gridRowEnd: 6,
  }
}

export default withRouter(withChoreContext(withUserContext(ChoreCard)));
