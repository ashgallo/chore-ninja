import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ChoreData from "./context/ChoreContext";
import RewardData from "./context/RewardContext";
import UserData from './context/UserContext';
import App from './App';

render(
  <BrowserRouter>
    <ChoreData>
      <RewardData>
        <UserData>
          <App />
        </UserData>
      </RewardData>
    </ChoreData>  
  </BrowserRouter>,
  document.getElementById("root")
);