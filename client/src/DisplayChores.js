import React from 'react';
import { withChoreContext } from './context/ChoreContext';
//import ChoreCard from './ChoreCard';
//import ChoreForm from './ChoreForm';

const DisplayChores = ({chores, deleteChore, editChore}) => {
  const displayCards = chores.map(chore => (
    <ChoreCard key={chore._id} id={chore._id} info={chore} deleteFunction={deleteChore} editFunction={editChore} style={styles.chore}/>
  ))

  
  //if role === parent, return parent/dashboard

  //if role === parent && endpoint === true, return chore form & index of chores
  return (
    createCard
    <div style={styles.page}>

      <div style={styles.container}></div>
        <div style={styles.form}>Chore Form</div>
        <div style={styles.grid}>
          <div>{displayCards}</div>
        </div>
    </div>
  ) 
  //if role === child, return child/dashboard
  //if role === child && endpoint === true, return detailed chore cards
  
}



        
const styles = {
  page: {
    backgroundColor: 'white'
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    border: 'solid 3px black',
    padding: '10px'

  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr',
    gridAutoColumns: '125px',
    gridAutoRows: '125px'
  },
  form: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    margin: 0
  },
  chore: {
    gridRowStart: 2,
    border: 'solid 2px green'
  }
}

export default withChoreContext(DisplayChores);