import { useState } from "react";
import { AppToast } from "./AppToast";

const CreateTaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // input datetime-local
  const [reminderMinutesBefore, setReminderMinutesBefore] = useState(30); // default 30 min

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      AppToast({ type: "error", message: "❌ O título da tarefa não pode estar vazio!" });
      return;
    }

    if (!deadline) {
      AppToast({ type: "error", message: "❌ Você precisa informar uma data e hora para a tarefa!" });
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      deadline: new Date(deadline).toISOString(), // garante formato ISO
      reminderMinutesBefore: Number(reminderMinutesBefore) || 30,
    };

    onCreateTask(taskData);

    AppToast({ type: "success", message: "✅ Tarefa criada com sucesso!" });

    // Reset campos
    setTitle("");
    setDescription("");
    setDeadline("");
    setReminderMinutesBefore(30);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-md font-bold mb-4 text-center text-gray-700 font-sans">
        Criar Nova Tarefa
      </h2>

      <input
        type="text"
        placeholder="Título da tarefa"
        className="w-full border p-2 rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descrição da tarefa"
        className="w-full border p-2 rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora do Prazo</label>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Lembrar quantos minutos antes?
      </label>
      <input
        type="number"
        className="w-full border p-2 rounded mb-2"
        value={reminderMinutesBefore}
        onChange={(e) => setReminderMinutesBefore(e.target.value)}
        min="0"
      />

      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded">
        Criar
      </button>
    </form>
  );
};

export default CreateTaskForm;
