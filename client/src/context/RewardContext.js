import React, { Conponent, createContext } from 'react';
import axios from 'axios';

const rewardAxios = axios.create();

rewardAxios.interceptors.request.use((config) => {
  const token = localStorage.getReward('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

const RewardContext = React.createContext();

export class rewardProvider extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      err: null,
      rewards: [],
      user: JSON.parse(localStorage.getReward("user")) || {},
      token: localStorage.getReward("token") || ""
    }
  }

  componentDidMount() {
    this.getRewards()
  }

  getRewards = () => {
    return rewardAxios.get("/api/todo")
      .then(response => {
        this.setState({ rewards: response.data });
        return response;
      })
  }

  addReward = (newReward) => {
    return rewardAxios.post("/api/todo/", newReward)
      .then(response => {
        this.setState(prevState => {
          return { rewards: [...prevState.rewards, response.data] }
        });
        return response;
      })
  }

  editReward = (rewardId, reward) => {
    return rewardAxios.put(`/api/reward/${rewardId}`, reward)
      .then(response => {
        this.setState(prevState => {
          const updatedRewards = prevState.rewards.map(reward => {
            return reward._id === response.data._id ? response.data : todo
          })
          return { rewards: updatedRewards }
        })
        return response;
      })
  }

  deleteReward = (rewardId) => {
    return rewardAxios.delete(`/api/reward/${rewardId}`)
      .then(response => {
        this.setState(prevState => {
          const updatedRewards = prevState.rewards.filter(reward => {
            return reward._id !== rewardId
          })
          return { rewards: updatedRewards }
        })
        return response;
      })
  }

  render() {
    return (
      <RewardContext.Provider
        value = {{
          getRewards: this.getRewards,
          addReward: this.getReward,
          editReward: this.editReward,
          deleteReward: this.deleteReward,
          ...this.state
        }}
      >
        {this.props.children}
      </RewardContext.Provider>
    )
  }
}

export const withContext = C => props (
  <RewardContext.Consumer>
    {value => <C {...props} {...value} />}
  </RewardContext.Consumer>
)