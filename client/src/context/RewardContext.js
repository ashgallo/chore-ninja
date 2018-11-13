import React, { Component, createContext } from 'react';
import axios from 'axios';

const rewardAxios = axios.create();

rewardAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

const RewardData = createContext();

export default class RewardProvider extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      err: null,
      rewards: []
    }
  }

  getRewards = () => {
    return rewardAxios.get("/api/rewards")
      .then(response => {
        this.setState({ rewards: response.data });
        return response;
      })
  };
  addReward = (newReward, cb) => {
    return rewardAxios.post("/api/rewards", newReward)
      .then(response => {
        this.setState(prevState => {
          return { rewards: [...prevState.rewards, response.data] }
        });
        return response;
      }, cb)
  };
  editReward = (rewardId, reward) => {
    return rewardAxios.put(`/api/rewards/${rewardId}`, reward)
      .then(response => {
        this.setState(prevState => {
          const updatedRewards = prevState.rewards.map(reward => {
            return reward._id === response.data._id ? response.data : reward
          })
          return { rewards: updatedRewards }
        })
        return response;
      })
  };
  deleteReward = (rewardId) => {
    return rewardAxios.delete(`/api/rewards/${rewardId}`)
      .then(response => {
        this.setState(prevState => {
          const updatedRewards = prevState.rewards.filter(reward => {
            return reward._id !== rewardId
          })
          return { rewards: updatedRewards }
        })
        return response;
      })
  };

  render() {
    return (
      <RewardData.Provider
        value = {{
          getRewards: this.getRewards,
          addReward: this.getReward,
          editReward: this.editReward,
          deleteReward: this.deleteReward,
          ...this.state
        }}
      >
        {this.props.children}
      </RewardData.Provider>
    )
  }
}

export const withRewardContext = C => props => (
  <RewardData.Consumer>
    {value => <C {...props} {...value} />}
  </RewardData.Consumer>
)