import TaskItem from "./TaskItem"
import Estatisticas from "./Estatisticas";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">

        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            📋 Minhas Tarefas
          </h1>

          <p className="text-sm text-gray-500">
            Gerencie e acompanhe suas tarefas
          </p>
        </div>

        <Estatisticas tasks={tasks} />

      </div>

      {/* Lista */}
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-700 font-sans">
          Nenhuma tarefa criada 😔
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}

    </div>
  )
}

export default TaskList
