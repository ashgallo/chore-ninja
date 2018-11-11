import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserData from './context/UserContext';
import App from './App';

render(
  <BrowserRouter>
    <UserData>
      <App />
    </UserData>
  </BrowserRouter>,
  document.getElementById("root")
);
