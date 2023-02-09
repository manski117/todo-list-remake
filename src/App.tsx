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

  

  //load the project list from local storage
  function getFromLocalStorage(){
    let allProjectsRaw = localStorage.getItem("allProjects");
    console.log(allProjectsRaw);
    if (!(allProjectsRaw === null)){
        let allProjectsLoaded = JSON.parse(allProjectsRaw);
        console.log(allProjectsLoaded);
        setAllProjects(allProjectsLoaded);
        console.log('local storage SHOULD have loaded successfully yeet');
    } else{
      console.log('local storage was found to be null');
    }
    
  }

  //save the project obj to local storage
  function saveToLocalStorage(stateData: ProjectObject | null){
  //convert the project list from an obj to string so it can be saved
    if(!(stateData===null)){
      localStorage.setItem("allProjects", JSON.stringify(stateData));
      console.log('...just tried to save! ...did it work??');

    } else{
      console.log('tried to save to local storage but it looks like state data was null!')
    }
    
    
  }



  React.useEffect(() =>{
    alert('this should run ONLY when the component first loads');
    console.log('this should run ONLY when the component first loads');
    getFromLocalStorage();
  }, []);


  React.useEffect(() => {
    console.log('new project state just dropped:');
    console.log('attempting to save to local storage...');
    console.log(allProjects);
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
