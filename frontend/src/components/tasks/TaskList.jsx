// Componets
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className=" space-y-2">
      <h2 className="text-xl font-bold mb-4 text-gray-700 font-sans">Minhas Tarefas</h2>
      {tasks.length === 0 ? (
        <p className=" text-xs text-gray-700 font-sans">Nenhuma tarefa criada 😔 </p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  )
}

export default TaskList
