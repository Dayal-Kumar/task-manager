import React, {useContext} from 'react';
import Dashboard from "./Dashboard";
import TaskView from "./TaskView";
import {myContext} from "../Context";
import Login from "./Login";

const Body = () => {
    const userObj = useContext(myContext);
    if(!userObj) return <Login/>;
    return <div>
        <Dashboard/>
        <TaskView/>
    </div>
}

export default Body;