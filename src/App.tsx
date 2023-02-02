import React from 'react';
import { useState, createContext } from 'react';
//components
import Header from './components/Header';
import Footer from './components/Footer';
import SelectedProject from './components/SelectedProject';
import ProjectSidebar from './components/ProjectsSidebar';
//styles
import './App.css';
//types


//create a context object to push context deep into component tree
const AllContext = React.createContext<any>(null);


function App() {
  //delcare state for selected project
  const [selectedProject, setSelectedProject] = useState(1);
  //currentTask
  const [currentTask, setCurrentTask] = useState(20);
  //all projects
  const [allProjects, setAllProjects] = useState(300);






  return (
    <div className="App">
      <Header />
      <p>From App() {selectedProject} &&& {currentTask} &&& {allProjects}</p>
      <AllContext.Provider 
      value={{
        allProjects: [allProjects, setAllProjects], 
        currentTask: [currentTask, setCurrentTask], 
        selectedProject: [selectedProject, setSelectedProject]}}>
        <main className="content flexbox">
          <SelectedProject />
          <ProjectSidebar />
        </main>
      </AllContext.Provider>
      <Footer />
    </div>
  );
}

export {App, AllContext};
