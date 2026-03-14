// Imports
import { Check, Trash2, Pencil } from "lucide-react";

// Toast
import { AppToast } from "./AppToast";
import { ConfirmDeleteToast } from "./ConfirmDeleteToast";


const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center ${task.completed ? "bg-green-100 border-green-400" : "bg-white border-gray-200"}`}>
      <div>
        <h3 className="text-md font-semibold text-gray-800">
          {task.title}
        </h3>

        <p className="text-sm text-gray-600">
          {task.description || "Sem descrição"}
        </p>
      </div>

      <div className="flex gap-3 items-center">

        <button
          onClick={() => onToggle(task)}
          className="text-green-600 hover:text-green-700"
        >
          <Check size={18} />
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-700"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() =>
            ConfirmDeleteToast({
              itemName: task.title,
              onConfirm: () => {
                onDelete(task._id); // apaga a tarefa
              },
            })
          }
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>

      </div>
    </div >
  );
};

export default TaskItem;
