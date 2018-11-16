import React from 'react';
import { withUserContext } from "../context/UserContext";
import CheckUser from '../CheckUser';
import Navbar from "../Navbar";
import FormContainer from '../FormContainer';
import AddKidForm from '../AddKidForm';
import timeGraph from '../time-graph.png';
import goalGraph from '../goal-graph.png';
import approve from '../approve.png';

function Dashboard({ user, addKid }) {
  return (
    <CheckUser user={user} userRole="parent">
      <Navbar />
      <div style={styles.headerContainer}>
        <h1 style={styles.username}>Welcome, {user.username}</h1>
        <FormContainer inputs={{
          "kid": ""
        }}>
          {props => (
            <AddKidForm {...props} handleSubmit={addKid} />
          )}
        </FormContainer>
      </div>

      <div style={styles.container}>
        <h3 style={styles.child}>Brooke</h3> 

        <div style={styles.row1}>
          <h4 style={styles.headers}>Chores to approve:</h4>
          <img src={approve} alt='approve' style={styles.img}></img>
        </div>

        <div style={styles.row2}>
          <h4 style={styles.headers}>Rewards to approve:</h4>
          <img src={approve} alt='approve' style={styles.img}></img>
        </div>

        <div style={styles.column2}>
          <img src={timeGraph} alt='Time Graph' style={styles.img}></img>
        </div>


        <div style={styles.column3}>
          <img src={goalGraph} alt='Goal Graph' style={styles.img}></img>
        </div>

      </div>
    </CheckUser>
  )
}

const styles = {
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 20px"
  },
  username: {
    fontFamily: 'Acme, sans-serif',
    fontSize: '40px',
    color: '#373738',
  },
  container: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '10px',
    border: 'solid 3px black',
    padding: '10px',
    margin: '10px'
  },
  headers: {
    margin: 5,
    fontFamily: 'Acme, sans-serif',
    fontSize: '20px',
    color: '#373738',
  },
  child: {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart1: 1,
    gridRowEnd: 2,
    margin: 0,
    fontFamily: 'Acme, sans-serif',
    fontSize: '25px',
  },
  row1: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 2,
  },
  row2: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 3,
  },
  column2: {
    gridColumnStart: 3,
    gridColumnEnd: 4,
    gridRowStart: 2,
    gridRowEnd: 4,
    display: 'flex',
    justifyContent: 'center',
    border: 'solid 2px #373738',
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
    border: 'solid 2px #373738'
  }
}

export default withUserContext(Dashboard);