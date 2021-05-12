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
import Experience from "./experience/Experience";
import ShowAllExperiences from "./experience/ShowAllExperiences";
import UpdateExperience from "./experience/UpdateExperience";
import EducationTips from "./education/EducationTips";
import Education from "./education/Education";
import ShowAllEducation from "./education/ShowAllEducation";
import UpdateEducation from "./education/UpdateEducation";
import ProjectTips from "./project/ProjectTips";
import Project from "./project/Project";
import ShowAllProjects from "./project/ShowAllProjects";
import UpdateProject from "./project/UpdateProject";

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

        <Route path="/experience" exact>
          <ExperienceTips />
        </Route>

        <Route path="/new/experience" exact>
          <Experience />
        </Route>

        <Route path="/experience/:experienceId" exact>
          <UpdateExperience />
        </Route>

        <Route path="/allExperiences" exact>
          <ShowAllExperiences />
        </Route>

        <Route path="/educationTips" exact>
          <EducationTips />
        </Route>

        <Route path="/new/education" exact>
          <Education />
        </Route>

        <Route path="/allEducations" exact>
          <ShowAllEducation />
        </Route>

        <Route path="/education/:educationId" exact>
          <UpdateEducation />
        </Route>

        <Route path="/projectTips" exact>
          <ProjectTips />
        </Route>

        <Route path="/new/project" exact>
          <Project />
        </Route>

        <Route path="/allProjects" exact>
          <ShowAllProjects />
        </Route>

        <Route path="/project/:projectId" exact>
          <UpdateProject />
        </Route>

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
