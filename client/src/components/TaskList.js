import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [selectedCard, setSelectedCard] = React.useState(0);
  let navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/tasks/${id}`);
  }
  const handleAddButtonClick = () => {
    navigate(`/tasks/new`);
  }

  return (
    <Box >
      <Typography variant="h6" gutterBottom>Task List</Typography>
       <Box style={{ display: "flex", justifyContent: "center", marginBottom: "10px"}}>
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
      {tasks.map((task, index) => (
       <Card variant="outlined">
          <CardActionArea
            onClick={() => handleCardClick(task._id)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div" >
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" x={{ marginTop: 5 }}>
                {task.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
    
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     sx={{ height: 140 }}
    //     image="/static/images/cards/contemplative-reptile.jpg"
    //     title="green iguana"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       Lizard
    //     </Typography>
    //     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //       Lizards are a widespread group of squamate reptiles, with over 6,000
    //       species, ranging across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
  );
};

export default TaskList;