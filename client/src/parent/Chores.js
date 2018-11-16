import React from "react";
import CheckUser from '../CheckUser';
import { withUserContext } from '../context/UserContext';
import Navbar from "../Navbar";
import ChoreForm from '../ChoreForm';
import ninjaHome from "../assets/img/ninjaHome.png";
import DisplayChores from '../DisplayChores';

function Chores({ user }) {
  return (          
    <CheckUser user={user} userRole="parent">
      <Navbar />
      <h1 style={styles.title}>Create Chores</h1>

      <ChoreForm />

      <img src={ninjaHome} alt="" style={styles.logo} />
      <div><hr style={styles.divider} /></div>

      <DisplayChores />
    </CheckUser>
  )
}

const styles = {
  title: {
    color: '#EB3460',
    margin: '40px 0 0 45px',
    fontFamily: 'Acme, sans-serif',
    fontSize: '60px'
  },
  divider: {
    display: 'block',
    margin: '0 10px 10px 10px',
    borderStyle: 'inset',
    borderWidth: '1px',
  },
  logo: {
    marginLeft: '10px',
  }
}

export default withUserContext(Chores);