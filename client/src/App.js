import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withUserContext } from './context/UserContext';

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ParentDashboard from "./parent/Dashboard";
import ParentChores from "./parent/Chores";
import ParentRewards from "./parent/Rewards";
import ChildDashboard from "./child/Dashboard";
import ChildChores from "./child/Chores";
import ChildRewards from "./child/Rewards";

import "./assets/css/styles.css";

const App = ({ user }) => (
  <div>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" render={() => <Redirect to={`/${user.role}/dashboard`}/>} />
      
      <ProtectedRoute exact path="/parent/dashboard" component={ParentDashboard} />
      <ProtectedRoute exact path="/parent/chores" component={ParentChores} />
      <ProtectedRoute exact path="/parent/rewards" component={ParentRewards} />
      <ProtectedRoute exact path="/child/dashboard" component={ChildDashboard} />
      <ProtectedRoute exact path="/child/chores" component={ChildChores} />
      <ProtectedRoute exact path="/child/rewards" component={ChildRewards} />
    </Switch>
  </div>
)

export default withUserContext(App);
