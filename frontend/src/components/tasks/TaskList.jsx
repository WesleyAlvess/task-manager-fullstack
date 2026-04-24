import { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });

  const filters = [
    { key: "all", label: "Todas" },
    { key: "pending", label: "Pendentes" },
    { key: "done", label: "Concluídas" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Minhas Tarefas
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Organize, acompanhe e conclua suas tarefas.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${filter === item.key
              ? "bg-blue-500 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-sm text-gray-500">
          Nenhuma tarefa encontrada 😔
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
