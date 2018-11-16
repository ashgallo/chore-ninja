import React from 'react';
import { withRouter } from 'react-router-dom';
import { withChoreContext } from './context/ChoreContext';
import { withUserContext } from './context/UserContext';
import ChoreCard from './ChoreCard';
import CheckUser from './CheckUser';

const DisplayChores = ({user, chores, deleteChore, editChore}) => {
  const displayCards = chores.map(chore => (
    <ChoreCard key={chore._id} id={chore._id} info={chore} deleteFunction={deleteChore} editFunction={editChore} style={styles.chore}/>
  ))
 
  return (
    <CheckUser user={user} userRole="parent">
      <div style={styles.container}>
        {displayCards}
      </div>
    </CheckUser>
  )
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '40px 10px',
  },
  chore: {
    gridRowStart: 2,
    border: 'solid 2px green'
  }
}

export default withRouter(withChoreContext(withUserContext(DisplayChores)));
