import React from 'react';
import { withRouter } from 'react-router-dom';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
//import Timer from './Timer';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';




function ChoreCard({ user, chores, loading, err, location, deleteChore, editChore, info: {_id, category, name, description, timeElapsed, completed, assignedTo, submitted, points, image} }) {
  // const createCard = 

  return (
    <div style={styles.card} >
      <img src={image.src} alt="" style={styles.image} />
      <h1>{name}</h1>
      <h4>{description}</h4>
      <h4>{points}</h4>
      <IconButton onClick={() => editChore(_id)}><EditIcon /></IconButton>
      <IconButton onClick={() => deleteChore(_id)}><DeleteIcon /></IconButton>
      {/* <DeleteTwoToneIcon className={classes.icon} /> */}
    </div>
    
    
    //if role === parent && /api/chores === true, return parent chore card (name, edit, delete)
    // location.pathname === '/chores'
    // <div>
    //   <h3>{chore}</h3>
    //   <img src={`/api/chores/images/${image.filename}`} alt="Chore Image" style={styles.image}/>
    // </div>
    
    //if role === child, return card summary 
  
    //if role === parent, return parent/dashboard

    //if role === child && descriptive card (in chores nav)

  )
}

const styles = {
  card: {
    width: '15vw',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff8ac',
    color: '#132a48',
    margin: '10px'
  },
  image: {
    width: '75px',
    height: 'auto'
  }
}

export default withRouter(withChoreContext(withUserContext(ChoreCard)));
