import { FaTimes } from 'react-icons/fa'

const Tasks = ({task, onDelete, onToggle}) => {
  return(
    <div className={`task task--${task.reminder}`} onDoubleClick={() => onToggle(task.id)}>
      <FaTimes onClick={() => onDelete(task.id)}/>
      <h3> {task.text} </h3> 
      <p> {task.day} </p>
    </div>
  )
}

export default Tasks