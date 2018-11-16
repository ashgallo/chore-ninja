import React from "react";

import { withUserContext } from '../context/UserContext';

import CheckUser from '../CheckUser';
import Navbar from "../Navbar";
import RewardForm from "../RewardForm";

import ninjaHome from "../assets/img/ninjaHome.png";

function Rewards({ user }) {
    return (
        <CheckUser user={user} userRole="parent">
            <Navbar />
            <h1 style={styles.title}>Create Rewards</h1>

            <RewardForm />

            <img src={ninjaHome} alt="" style={styles.logo}/>
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
      margin: '0 10px 10px 10px',
      borderStyle: 'inset',
      borderWidth: '1px',
    },
    logo: {
      marginLeft: '10px',
    },
    displayCards: {
  
    }
  }

export default withUserContext(Rewards);