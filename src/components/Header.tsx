import React, { useContext } from "react";
import { AllContext } from "../App";
import updateResponsiveHeight from "../reusedFunctions/reusedFunctions";

export default function Header() {
  const { sidebarOpen } = React.useContext(AllContext);
  const [sidebarOpenCopy, setSidebarOpen] = sidebarOpen;

  

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpenCopy);
    updateResponsiveHeight();
    
  }


  let openClassNames = sidebarOpenCopy ? "nav-icon hidden" : "nav-icon";
  let closeClassNames = sidebarOpenCopy ? "nav-icon" : "nav-icon hidden";

  return (
    <nav className="flexbox">
      <h1>To-Do List App</h1>
      <div className="menu-toggle">
        <img
          onClick={toggleSidebar}
          className={openClassNames}
          id="navClosed"
          src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/menu.png"
          alt="open/close tab"
        />
        <img
          onClick={toggleSidebar}
          className={closeClassNames}
          id="navOpen"
          src="https://img.icons8.com/ios-filled/100/FFFFFF/multiply.png"
          alt="open/close tab"
        />
      </div>
    </nav>
  );
}