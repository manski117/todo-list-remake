import React from "react";

export default function Header(){


    return(
        <nav className="flexbox">
            <h1>To-Do List App</h1>
            <div className="menu-toggle">
                <img className="navIcon" id="navClosed" src="https://img.icons8.com/ios-filled/50/null/menu--v1.png" alt="open/close tab" />
                <img className="navIcon" id='navOpen' src="https://img.icons8.com/ios-filled/50/null/delete-sign--v1.png" alt="open/close tab" />
            </div>
        </nav>
    )
}