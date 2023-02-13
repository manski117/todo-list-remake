import React, { useContext } from "react";
import { AllContext } from "../App";
import EditProjectForm from "./EditProjectForm";

export default function ProjectMenuItem(props: any) {
  const { allProjects, selectedProject } = React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;

  const [editOpen, setEditOpen] = React.useState<boolean>(false);

  //variables and objects
  let projectToEdit = props.projectName;
  let editProjectComponent = (
    <EditProjectForm
      oldProjectName={projectToEdit}
      handleClick={toggleEditForm}
    />
  );

  function handleEditClick() {
    toggleEditForm();
    //fucntion takes project name as a string
    //renders project form component with this string as its initial value.
    // but doesn't crash if it's the SAME value.
  }

  function toggleEditForm() {
    setEditOpen(!editOpen);
  }

  function handleTitleClick() {
    updateSelectedProject();
  }

  function updateSelectedProject() {
    setSelectedProject(`${props.projectName}`);
  }

  return (
    <div className="project-item-container">
      <div className="project-menu-item flexbox">
        <img
          className="icon-img"
          src="https://img.icons8.com/glyph-neue/64/FFFFFF/test-passed.png"
          alt="icon"
        />
        <h3 className="project-item-heading" onClick={handleTitleClick}>
          {props.projectName}
        </h3>
        <img
          className="icon icon-btn"
          title="Edit Project"
          onClick={handleEditClick}
          src="https://img.icons8.com/sf-black/64/FFFFFF/pencil.png"
          alt="icon"
          role="button"
          tabIndex={0}
          aria-label="Clickable image"
        />
      </div>
      {editOpen ? editProjectComponent : null}
    </div>
  );
}