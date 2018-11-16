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
    <div>
      <div style={styles.container}>

        <div style={styles.grid}>
        {/* map through the available kids */}
          <div>
            {/* {user.child} */}
            {displayCards}
          </div>
        </div>
      </div>
    </div>
    </CheckUser>
  )
}


const styles = {
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    border: 'solid 3px black',
    margin: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr',
    gridAutoColumns: '125px',
    gridAutoRows: '125px'
  },
  chore: {
    gridRowStart: 2,
    border: 'solid 2px green'
  }
}

export default withRouter(withChoreContext(withUserContext(DisplayChores)));
