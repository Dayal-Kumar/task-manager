import React, {useEffect} from 'react';
import {myContext} from "../Context";
import axios from "axios";
import ReactHTMLDatalist from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';


const AddEditTask = (props) => {
    const userContext = React.useContext(myContext);
    const [newTask, setNewTask] = React.useState(props.task);

    useEffect(() => {
        if(props.type === 'edit')
            setNewTask(props.task);
        if(props.type === 'add')
            setNewTask({});
    }, [props]);
    

    const handleSubmit = () => {
        if(props.type === 'add') {
            axios.post(`${process.env.REACT_APP_API_URL}/task`, newTask, {withCredentials: true}).then(() => setNewTask({}));
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/task/update`, newTask, {withCredentials: true});
        }
    }

    const handleChange = (event) => {
        setNewTask({...newTask, [event.target.name]: event.target.value});
    }


    return <form onSubmit={handleSubmit} style={{border: '1px solid', margin: '20px auto', borderRadius: '10px', width: '20%'}}>
        <center><h3>{props.type === 'add' ? 'Add a new Task' : 'Edit this Task'}</h3></center>
        <div style={{width: '250px', margin: 'auto', padding: '5px'}}><input placeholder="Title" type='text' name="title" onChange={handleChange} value={newTask.title} style={{borderRadius: '5px', width: '240px'}}/></div>
        <div style={{width: '250px', margin: 'auto', padding: '5px'}}><textarea placeholder="Description" name="description" onChange={handleChange} value={newTask.description} style={{borderRadius: '5px', width: '240px', margin: 'auto', padding: '5px'}}/></div>
        <ReactHTMLDatalist
            placeholder="Person Assigned" style={{width: '250px', margin: 'auto', padding: '5px'}}
            name="personAssigned"
            value={newTask.personAssigned}
            setValue={(value)=>setNewTask({...newTask, personAssigned: value})}
            onSelect={(item)=>setNewTask({...newTask, personAssigned: item.value})}
            items={userContext.people.map(person => {return {id: person, value: person}})}
            label="Person Assigned"
            showLabel={false}
        />
        <ReactHTMLDatalist
            placeholder="Status" style={{width: '250px', margin: 'auto', padding: '5px'}}
            name="status"
            value={newTask.status}
            setValue={(value)=>setNewTask({...newTask, status: value})}
            onSelect={(item)=>setNewTask({...newTask, status: item.value})}
            items={userContext.status.map(status => {return {id: status, value: status}})}
            label="Status"
            showLabel={false}
        />

        <div style={{position: 'relative', padding: '5px'}}>
            <center><input type="submit" style={{margin: 'auto'}}/></center>

        </div>
    </form>
}

export default AddEditTask;