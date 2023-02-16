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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  

  //load the project list from local storage
  function getFromLocalStorage(){
    let allProjectsRaw = localStorage.getItem("allProjects");
    
    if (!(allProjectsRaw === null)){
        let allProjectsLoaded = JSON.parse(allProjectsRaw);
        
        setAllProjects(allProjectsLoaded);
        
    } else{
      
    }
    
  }

  //save the project obj to local storage
  function saveToLocalStorage(stateData: ProjectObject | null){
  //convert the project list from an obj to string so it can be saved
    if(!(stateData===null)){
      localStorage.setItem("allProjects", JSON.stringify(stateData));

    } else{
      console.warn('Unable to save to local storage. allProjects is currently null');
    }

  }



  React.useEffect(() =>{
    //should only load when app first renders
    getFromLocalStorage();
  }, []);


  React.useEffect(() => {
    saveToLocalStorage(allProjects);
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
