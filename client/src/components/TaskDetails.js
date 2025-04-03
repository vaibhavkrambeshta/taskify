import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector(state => state.tasks.tasks.find(task => task.id === id));

  if (!task) return <p>Task not found.</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskDetails;