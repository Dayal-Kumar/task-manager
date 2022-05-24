import React, {useEffect, useState} from 'react';
import axios from "axios";
import AddEditTask from "./AddEditTask";
import Task from "./Task";
import {myContext} from "../Context";
import {Grid} from "@mui/material";

const TaskView = () => {
    const userObj = React.useContext(myContext);
    const [type, setType] = useState({type: 'add', task: {}});
    const [tasks, setTasks] = useState([]);

    const handler = (val) => {
        setType(val);
    }

    const deleteHandler = (value) => {
        setTasks(value);
    }

    const reloader = ()=> {
        axios.get(`${process.env.REACT_APP_API_URL}/task`, {withCredentials: true}).then(res => {
            console.log(res.data);
            setTasks(res.data);
        });
    }

    useEffect(()=> {
        reloader();
    }, [userObj]);
    return <>
        <AddEditTask
            type={type.type}
            task={type.task}
        />
        <div>
            <Grid container spacing={2} padding={5} >
        {
            tasks.map(task => (<Grid item xs={4}> <Task value={task} key={task._id} stateChanger={handler} deleteHandler={deleteHandler} reloader={reloader}/></Grid>))
        }
            </Grid>
        </div>
    </>
}

export default TaskView;