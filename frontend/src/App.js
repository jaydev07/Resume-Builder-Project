import React,{useState,useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.css';
import {AuthContext} from "./shared/context/auth-context";
import Auth from "./authentication/Auth";
import HomePage from "./home/HomePage";
import PersonalInfo from "./personalInfo/PersonalInfo";
import ExperienceTips from "./experience/ExperienceTips";

function App() {

  const [isLogedIn , setIsLogedIn] = useState(false);

  const [userId , setUserId] = useState();

  const [resumeId , setResume] = useState();

  const login = useCallback((userId) => {
    setIsLogedIn(true);
    setUserId(userId);
  },[]);

  const logout = useCallback((userId) => {
    setIsLogedIn(false);
    setUserId(null);
  },[]);

  const setResumeId = useCallback((resumeId) => {
    setResume(resumeId);
  })

  let routes;

  if(isLogedIn){
    routes = (
      <Switch>            
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/personalInfo" exact>
          <PersonalInfo />
        </Route>

        <Router path="/experience" exact>
          <ExperienceTips />
        </Router>

        <Redirect to="/" />        
      </Switch>
    )
  }else{
    routes = (
      <Switch>            
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />        
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{
      isLogedIn:isLogedIn,
      userId:userId,
      resumeId:resumeId,
      login:login,
      logout:logout,
      setResumeId:setResumeId
    }}>
      <Router>
        {routes}      
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
