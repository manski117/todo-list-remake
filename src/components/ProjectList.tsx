import React, { useContext } from "react";
import { AllContext } from "../App";
import ProjectMenuItem from "./ProjectMenuItem";

export default function ProjectList() {
  const { allProjects } = React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;

  //local variables:
  const [displayProjects, setDisplayProjects] = React.useState <any>(null);
  let projects: any;

  //run this only when state updates
  React.useEffect(() => {
    //if there are projects to load, use them to populate components in the sidebar.
    if (allProjectsCopy !== null) {
      projects = Object.keys(allProjectsCopy);
      let displayProjectsUpdate = projects.map((item: any) => (
        <div key={item}>
          <ProjectMenuItem projectName={item} />
        </div>
      ));
      setDisplayProjects(displayProjectsUpdate);
    }
  }, [allProjectsCopy]);

  return (
    <div className="project-list flexbox">
      {displayProjects !== null ? displayProjects : null}
    </div>
  );
}
