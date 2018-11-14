import React from 'react';
import Navbar from "../Navbar";
import timeGraph from '../time-graph.png';
import goalGraph from '../goal-graph.png';

const Dashboard = () => (
  <div>
    <Navbar />
    <h1>Welcome, Parent</h1>
    <button style={styles.button}>Add Kid</button>

    <div style={styles.container}>
      <h3 style={styles.child}>Child 1</h3>

      <div style={styles.row1}>
        <h4 style={styles.headers}>Chores to approve:</h4>
      </div>

      <div style={styles.row2}>
        <h4 style={styles.headers}>Rewards to approve:</h4>
      </div>
      
      <div style={styles.column2}>
        <img src={timeGraph} alt='Time Graph' style={styles.img}></img>
      </div>
    
    
      <div style={styles.column3}>
        <img src={goalGraph} alt='Goal Graph' style={styles.img}></img>
      </div>
      
    </div>
  </div>
)

const styles = {
  button: {
    padding: '10px',
    borderRadius: '5px',
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: '#0072a3',
    color: '#f2f2f2'
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '10px',
    border: 'solid 3px black',
    padding: '10px',
  },
  headers: {
    margin: 5
  },
  child: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart1: 1, 
    margin: 0
  },
  row1: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 2,
    border: 'solid 2px green'
  },
  row2: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 3,
    border: 'solid 2px orange'
  },
  column2: {
    gridColumnStart: 3,
    gridColumnEnd: 4,
    gridRowStart: 2,
    gridRowEnd: 4,
    display: 'flex',
    justifyContent: 'center',
    border: 'solid 2px blue',
  },
  img: {
    height: 'auto',
    width: 'auto',
    alignSelf: 'center',
    margin: 0,
    padding: 0
  },
  column3: {
    gridColumnStart: 4,
    gridColumnEnd: 5,
    gridRowStart: 2,
    gridRowEnd: 4,
    border: 'solid 2px red'
  }
}

export default Dashboard;