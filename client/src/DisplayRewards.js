import React from 'react';
import { withRouter } from 'react-router-dom';
import { withRewardContext } from './context/RewardContext';
import { withUserContext } from './context/UserContext';
import RewardCard from './RewardCard';
import CheckUser from './CheckUser';

const DisplayRewards = ({user, rewards, deleteReward, editReward}) => {
  const displayRewards = rewards.map(reward => (
    <RewardCard key={reward._id} id={reward._id} info={reward} deleteFunction={deleteReward} editFunction={editReward} style={styles.Reward}/>
  ))
 
  return (
    <CheckUser user={user} userRole="parent">
      <div style={styles.container}>
        {displayRewards}
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
  reward: {
    gridRowStart: 2,
    border: 'solid 2px green'
  }
}

export default withRouter(withRewardContext(withUserContext(DisplayRewards)));