import React from "react";
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = React.useState('');
    React.useEffect(() => {
        dispatch(fetchTasks({ status: filter }));
    }, [filter, dispatch]);

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    return (
        <div>
            <Paper style={{ height: "90vh", padding: "20px", overflowY: "auto" }}>
                <Typography variant="h3" gutterBottom>Taskify</Typography>
                <TaskFilter onFilterChange={handleFilterChange} />
                <TaskList filter={filter} />
            </Paper>
        </div>
    );
};

export default Home;