import React from 'react';
//components
import Header from './components/Header';
import Footer from './components/Footer';
import SelectedProject from './components/SelectedProject';
import ProjectSidebar from './components/ProjectsSidebar';
//styles
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="content flexbox">
        <SelectedProject />
        <ProjectSidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
