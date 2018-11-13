import React from 'react';
import { withRouter } from 'react-router-dom';
import { withChoreContext} from './context/ChoreContext';

function ChoreCard({ chores, loading, err, location, deleteChore, editChore, info: {_id, category, name, description, startedAt, completed, assignedTo, submittedAt, submitted, points, createdBy, image} }) {
  const createCard = 
  return(
    
    //if role === parent && /api/chores === true, return chore form & index of chores
    location.pathname === '/chores'
    <div>
      <h3>{chore}</h3>
      <img src={`/api/chores/images/${image.filename}`} alt="Chore Image" style={styles.image}/>
    </div>
    createCard=
    //if role === child (summary view of chore on dashboard)
  
    //if role === parent, return parent/dashboard

    //if role === child && descriptive card (in chores nav)

  )
}

const styles = {
  card: {
    width: '15vw',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#d8e2e8',
    color: '#132a48'
  },
  image: {
    width: '75px',
    height: 'auto'
  }
}

export default withRouter(withChoreContext(ChoreCard));
