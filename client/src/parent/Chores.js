import React from "react";
import CheckUser from '../CheckUser';
import { withUserContext } from '../context/UserContext';
import Navbar from "../Navbar";
import Form from '../Form';
import ninjaHome from "../assets/img/ninjaHome.png";

//import DisplayChores from '../DisplayChores';

function Chores({ user }) {
  return (          
    <CheckUser user={user} userRole="parent">
      <Navbar />
      <h1 style={styles.title}>Create Chores</h1>
      <Form />
      <img src={ninjaHome} alt="" style={styles.logo} />
      <div><hr style={styles.divider} /></div>
    </CheckUser>
  )
}

const styles = {
  title: {
    color: '#0072a3',
    margin: '10px 0 0 10px',
  },
  divider: {
    display: 'block',
    margin: '0 10px 0 10px',
    borderStyle: 'inset',
    borderWidth: '1px',
  },
  logo: {
    marginLeft: '10px',
  }
}

export default withUserContext(Chores);