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


type TaskObject = {
  complete: boolean;
  date: string;
  details: string;
  title: string;
}

export type ProjectObject = {
  title: string;
  tasks: TaskObject; 
}




//create a context object to push context deep into component tree
const AllContext = React.createContext<any>(null);


function App() {
  //delcare state for selected project
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  //currentTask
  const [currentTask, setCurrentTask] = useState(15);
  //all projects
  const [allProjects, setAllProjects] = useState<ProjectObject | null>(null);
  //sidebar displayed
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);


  React.useEffect(() => {
    console.log('new project state just dropped:')
    console.log(allProjects);
  }, [allProjects]);


  return (
    <div className="App">
      <AllContext.Provider 
      value={{
        allProjects: [allProjects, setAllProjects], 
        currentTask: [currentTask, setCurrentTask], 
        selectedProject: [selectedProject, setSelectedProject],
        sidebarOpen: [sidebarOpen, setSidebarOpen]}}>
      <Header />
      <p>Root state: {currentTask}, {selectedProject}</p>
      
        <main className="content flexbox">
          <SelectedProject />
          <ProjectSidebar />
        </main>
      
      <Footer />
      </AllContext.Provider>
    </div>
  );
}

export {App, AllContext};
