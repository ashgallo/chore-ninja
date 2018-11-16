import React, { Component, createContext } from 'react';
import axios from 'axios';

const rewardAxios = axios.create({
  transformRequest: [data => {
    const formData = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key])
        }
    };
    return formData;
}]
});

rewardAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

const RewardData = createContext();
const rewardUrl = '/api/rewards'

export default class RewardProvider extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      err: null,
      rewards: []
    }
  }

  blobify = (url) => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return fetch(url, options)
      .then(res => {
        return res.blob()
      }).then(blob => {
        return URL.createObjectURL(blob)
      })
  }
  getRewards = () => {
    return rewardAxios.get(rewardUrl)
      .then(async (response) => {
        const rewards = await Promise.all(response.data.map(reward => this.blobify(`/api/rewards/images/${reward.image.filename}`)
          .then(src => ({ ...reward, image: { ...reward.image, src } }))))
          
        this.setState({ rewards });
        return response;
      })
  };
  addReward = (newReward, cb) => {
    return rewardAxios.post(rewardUrl, newReward)
      .then(async response => {
        const reward = response.data;
        const src = await this.blobify(`/api/rewards/images/${reward.image.filename}`);
        reward.image.src = src;
        this.setState(prevState => {
          return { rewards: [...prevState.rewards, reward] }
        });
        return response;
      }, cb)
  };
  editReward = (rewardId, reward) => {
    return rewardAxios.put(`${rewardUrl}/${rewardId}`, reward)
      .then( async response => {
        const updatedReward = response.data;
        const src = await this.blobify(`/api/rewards/images/${updatedReward.image.filename}`);
        updatedReward.image.src = src;
        this.setState(prevState => {
          const updatedRewards = prevState.rewards.map(reward => {
            return reward._id === rewardId? updatedReward : reward
          })
          return { rewards: updatedRewards }
        })
        return response;
      })
  };
  deleteReward = (rewardId) => {
    return rewardAxios.delete(`${rewardUrl}/${rewardId}`)
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
          addReward: this.addReward,
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