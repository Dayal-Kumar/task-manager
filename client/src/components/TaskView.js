import React, {useEffect, useState} from 'react';
import AddEditTask from "./AddEditTask";
import Task from "./Task";
import {Grid} from "@mui/material";
import {axiosInstance} from "../config";

const TaskView = (props) => {
    const [type, setType] = useState({type: 'add', task: {}});
    const [tasks, setTasks] = useState([]);

    const handler = (val) => {
        setType(val);
    }

    const deleteHandler = (value) => {
        setTasks(value);
    }

    const taskReloader = ()=> {
        axiosInstance.get('/task', {withCredentials: true}).then(res => {
            console.log(res.data);
            setTasks(res.data);
        });
    };



    useEffect(()=> {
        taskReloader();
    }, [props.user]);
    return <>
        <AddEditTask
            type={type.type}
            task={type.task}
            user={props.user}
            userReloader={()=> props.userReloader()}
        />
        <div>
            <Grid container spacing={2} padding={5} >
        {
            tasks.map(task => (<Grid item xs={4}> <Task value={task} key={task._id} stateChanger={handler} deleteHandler={deleteHandler} reloader={taskReloader} user={props.user}/></Grid>))
        }
            </Grid>
        </div>
    </>
}

export default TaskView;