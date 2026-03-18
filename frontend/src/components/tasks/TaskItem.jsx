// Imports
import { Check, Trash2, Pencil } from "lucide-react";

// Toast
import { ConfirmDeleteToast } from "./ConfirmDeleteToast";
import { useEffect, useState } from "react";


const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  // useEstate
  const [now, setNow] = useState(new Date())
  // timer de atualizar os as cores do card
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000) // atualiza a cada 1 minuto
    return () => clearInterval(interval)
  }, [])

  // Melhorando a visualizaco da data
  const deadLineDate = task.deadline ? new Date(task.deadline).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }) : null;

  // Funcao que mostra Cores de advertencia nos cards para cada tempo
  let priorityColor = "bg-green-500"
  if (task.deadline && task.createdAt) {

    const created = new Date(task.createdAt)
    const deadLine = new Date(task.deadline)

    const totalTime = deadLine - created

    if (totalTime > 0) {

      const passedTime = now - created
      const progress = passedTime / totalTime

      if (now > deadLine) {
        priorityColor = "bg-gray-400"
      } else if (progress > 0.8) {
        priorityColor = "bg-red-500"
      } else if (progress > 0.5) {
        priorityColor = "bg-yellow-400"
      }

    }
  }
  return (
    <div
      className={`relative border rounded-lg p-4 pl-5 shadow-sm 
    hover:shadow-md hover:scale-[1.01] transition-all duration-200
    ${task.completed
          ? "bg-green-100 border-green-400"
          : "bg-white border-gray-200"
        }`}
    >

      {/* Barra lateral */}
      <div className={`absolute left-0 top-0 h-full w-2 ${priorityColor} rounded-l-lg`} />

      <div className="flex flex-col gap-2">

        {/* Linha 1: título + ações */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            {task.title}
          </h3>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => onToggle(task)}
              className="text-green-500 hover:text-green-700 hover:scale-110 transition-all duration-200"
            >
              <Check size={18} />
            </button>

            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-all duration-200"
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
              className="text-red-600 hover:text-red-700 hover:scale-110 transition-all duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Linha 2: descrição */}
        <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-2 whitespace-pre-line max-h-32 overflow-y-auto pr-2">
          {task.description || "Sem descrição"}
        </p>

        {/* Linha 3: infos */}
        {deadLineDate && (
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">
              ⏰ {deadLineDate}
            </span>

            {task.reminderMinutesBefore != null && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                🔔 {task.reminderMinutesBefore} min antes
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  )
};

export default TaskItem;
