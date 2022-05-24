import React, {useContext, useEffect} from 'react';
import Dashboard from "./Dashboard";
import TaskView from "./TaskView";
import Login from "./Login";

const Body = (props) => {

    if(!props.user) return <Login/>;
    return <div>
        <Dashboard/>
        <TaskView user={props.user} userReloader={()=> props.userReloader()}/>
    </div>
}

export default Body;