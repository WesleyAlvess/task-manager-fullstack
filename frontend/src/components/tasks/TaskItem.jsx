import { Check, Trash2, Pencil } from "lucide-react";
import { ConfirmDeleteToast } from "./ConfirmDeleteToast";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div
      className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-start gap-4 ${task.completed
          ? "bg-green-50 border-green-300"
          : "bg-white border-gray-200"
        }`}
    >
      <div className="min-w-0">
        <h3
          className={`text-md font-semibold ${task.completed ? "text-gray-500 line-through" : "text-gray-800"
            }`}
        >
          {task.title}
        </h3>

        <p className="text-sm text-gray-600 break-words">
          {task.description || "Sem descrição"}
        </p>

        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${task.completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {task.completed ? "Concluída" : "Pendente"}
        </span>
      </div>

      <div className="flex gap-2 items-center shrink-0">
        <button
          onClick={() => onToggle(task)}
          className="p-2 rounded-lg text-green-600 hover:bg-green-100 transition"
          title="Concluir tarefa"
        >
          <Check size={18} />
        </button>

        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
          title="Editar tarefa"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() =>
            ConfirmDeleteToast({
              itemName: task.title,
              onConfirm: () => onDelete(task._id),
            })
          }
          className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
          title="Excluir tarefa"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
