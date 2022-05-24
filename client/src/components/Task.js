import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useContext} from "react";
import {myContext}   from "../Context";
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {axiosInstance} from "../config";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Task(props) {
    const userContext = useContext(myContext);
    const [task, setTask] = React.useState(props.value);
    const [expanded, setExpanded] = React.useState(false);


    const handleChange = (event) => {
        setTask({...task, status: event.target.value});
        axiosInstance.post('/task/update', {...task, status: event.target.value}, {withCredentials: true});
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteOutlineClick = () => {
        axiosInstance.post('/task/delete', task, {withCredentials: true}).then(()=>{
        })
        props.reloader();
    };

    return (
        <Card sx={{ maxWidth: '100%', backgroundColor: '#42b0f5'}}>
            <CardHeader
                title={props.value.title}
                action={
                <IconButton aria-label="Edit" onClick={()=>props.stateChanger({type: 'edit', task: task})}>
                    <EditIcon/>
                </IconButton>
                }
                subheader={`Assigned to ${props.value.personAssigned}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {
                        expanded === false ? (props.value.description?.length > 20 ? `${props.value.description?.substring(0,19)}...` : props.value.description) : null
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={task.status}
                        label="Status"
                        onChange={handleChange}
                        autoWidth
                    >
                        {userContext.status.map(option =>
                            <MenuItem value={option}>{option}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>
                        {props.value.description}
                    </Typography>
                    <Button type="submit" onClick={()=> handleDeleteOutlineClick()}><DeleteOutlineIcon/></Button>
                </CardContent>
            </Collapse>
        </Card>
    );
}
