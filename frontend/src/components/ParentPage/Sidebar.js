import React from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";

import styles from "./Sidebar.module.scss";

const Sidebar = ({setHomePanel, setAddChildPanel, setCreateTokenPanel}) => {
  console.log()

  const doSomething = (props) => {
    console.log(`doing it`)
  }
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <Avatar />
            </div>
            <nav>
                <ul className={styles.ul}>
                    <NavLink to="/parent">Home</NavLink>
                    <NavLink to="/parent/addchild">Add Child</NavLink>
                    <NavLink to="/parent/createtoken">Create Token</NavLink>

                    <li><button onClick={setHomePanel}>Home</button></li>
                    <li><button onClick={setAddChildPanel}>Add Child</button></li>
                    <li><button onClick={setCreateTokenPanel}>Create Token</button></li>
                    {/* <li><button onClick={()=> {props("yo")}}>yeeboi</button></li>
                    <li><button onClick={()=> {props.dodo("yo")}}>yeeboi</button></li> */}
                    {/* <li><button onClick={()=> {func("yo")}}>yeeboi</button></li> */}
                    <li>Create New Token</li>
                    <li>Add New Subscriber</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
