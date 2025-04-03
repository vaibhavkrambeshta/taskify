import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../features/tasks/tasksSlice';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleAddButtonClick = () => {
    navigate(`/tasks/new`);
  };

  const handletrashClick = async (task) => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      // Refresh tasks after deletion
      dispatch(fetchTasks());
    } catch (error) {
      console.error("Failed to delete the task:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Task List</Typography>
      <Box style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
          Add Task
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {tasks.map((task) => (
          <Card key={task._id} variant="outlined">
            <CardActionArea>
              <CardContent sx={{ height: '100%' }}>
                <Box style={{ float: "right" }}>
                  <IconButton aria-label="Edit" onClick={() => handleEditClick(task._id)}>
                    <FontAwesomeIcon icon={faEdit} size="xs" />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => handletrashClick(task)}>
                    <FontAwesomeIcon icon={faTrash} size="xs" />
                  </IconButton>
                </Box>
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {task.description}
                </Typography>
                <Typography variant="caption" gutterBottom sx={{ display: 'block', marginTop: 5 }}>
                  Due Date: {task.dueDate}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Priority: {task.priority}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Status: {task.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TaskList;