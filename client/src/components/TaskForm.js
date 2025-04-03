import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/tasksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const TaskForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector(state => state.tasks.tasks);
    console.log("tasks===", tasks)
    const existingTask = tasks.find(task => task._id === id) || {};
    console.log("existingTask===", existingTask)
    const [title, setTitle] = React.useState(existingTask.title || '');
    const [description, setDescription] = React.useState(existingTask.description || '');
    const [dueDate, setDueDate] = React.useState(dayjs(existingTask.dueDate) || dayjs());
    const [priority, setPriority] = React.useState(existingTask.priority || '');
    const [status, setStatus] = React.useState(existingTask.status || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateTask({ id, updatedTask: { title, description, dueDate, priority, status } }));
        } else {
            dispatch(addTask({ title, description, dueDate, priority, status }));
        }
        navigate('/');
    };
    const handleDateChange = (date) => {
        setDueDate(date)
    }

    return (
        <Box style={{
            margin: "auto",
            width: "30%",
            // border: "3px solid green",
            padding: "10px"
        }}>
            <AppBar>
                <toolbar>
                    <h1>Create Task </h1>
                </toolbar>
            </AppBar>
            <Box style={{marginTop: "20px", marginLeft: "53px"}}>
            <form>
                <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Title"
                    variant="outlined"
                    value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required
                />
                <br /><br />
                <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Description"
                    variant="outlined"
                    value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                />
                <br /><br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Due Date"
                        variant="outlined"
                        value={dueDate}
                        onChange={handleDateChange}
                        style={{ width: "400px", marginLeft: "5px" }}
                    />
                </LocalizationProvider>
                <br /><br />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ width: "400px", margin: "5px" }}
                    >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                    </Select>
                </FormControl>
                <br /><br />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Description"
                        style={{ width: "400px", margin: "5px" }}
                    >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                </FormControl>
                <br /><br />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    save
                </Button>
            </form>
            </Box>
        </Box>
    );
};

export default TaskForm;