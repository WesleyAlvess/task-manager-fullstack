import TaskItem from "./TaskItem"
import Estatisticas from "./Estatisticas";
import { useState } from "react";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  // useStates
  // Estado pra filtrar tarefas
  const [filter, setFilter] = useState("all")

  // Fitrar tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true // Todas 
    if (filter === "Pending") return !task.completed // Pendentes
    if (filter === "completed") return task.completed // Completas

    if (filter === "expired") { // Expiradas
      if (!task.deadline) return false
      return new Date() > new Date(task.deadline)
    }

    return false
  })

  // Ordenar a lista de taks por deadline
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.deadline) return 1 // tarefas sem deadline vão pro final
    if (!b.deadline) return -1

    return new Date(a.deadline) - new Date(b.deadline) // mais próximo primeiro
  })

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start mb-6">

        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            📋 Minhas Tarefas
          </h1>

          <p className="text-sm text-gray-500">
            Gerencie e acompanhe suas tarefas
          </p>

          {/* Filtro de tarefas */}
          <div className="flex gap-3 mt-3 text-sm ">

            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full transition-all duration-200
      ${filter === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              Todas
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded-full transition-all duration-200
      ${filter === "pending"
                  ? "bg-yellow-400 text-white"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
            >
              Pendentes
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-full transition-all duration-200 
      ${filter === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              Concluídas
            </button>

            <button
              onClick={() => setFilter("expired")}
              className={`px-3 py-1 rounded-full transition-all duration-200 
      ${filter === "expired"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
            >
              Vencidas
            </button>

          </div>
        </div>


        <Estatisticas tasks={tasks} />

      </div>

      {/* Lista */}
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-700 font-sans">
          Nenhuma tarefa criada 😔
        </p>
      ) : (
        sortedTasks.map((task) => (
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
