import React, { useContext } from "react";
import { AllContext } from "../App";
import TaskMenuItem from "./TaskMenuItem";

export default function TaskList() {
  const { allProjects, selectedProject } =
    React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;

  //local state
  const [displayTasks, setDisplayTasks] = React.useState<any>(null);
  let tasks: any;

  //functions to update components
  function isObjEmpty(obj: any) {
    console.log(obj);
    if (obj === undefined || obj === null) {
      console.log(".tasks is undefined");
      return true;
    } else {
      console.log(".tasks has something in it!");
      return false;
    }
  }

  //generate components
  //run this only when state updates
  React.useEffect(() => {
    //are there projects that exist?
    if (allProjectsCopy !== null) {
      let tasksEmpty = isObjEmpty(
        allProjectsCopy[`${selectedProjectCopy}`]?.tasks
      );

      //if tasks for the selected project exist, load components representing them all
      if (!tasksEmpty) {
        tasks = Object.values(allProjectsCopy[`${selectedProjectCopy}`].tasks);
        let displayTasksUpdate = tasks.map((item: any) => (
          <div key={item.title}>
            <TaskMenuItem
              taskName={item.title}
              taskDate={item.date}
              taskDetails={item.details}
              taskStatus={item.complete}
            />
          </div>
        ));
        setDisplayTasks(displayTasksUpdate);
      }
    }
  }, [allProjectsCopy, selectedProjectCopy]);

  return (
    <div className="project-tasks flexbox">
      {displayTasks !== null ? displayTasks : null}
    </div>
  );
}
