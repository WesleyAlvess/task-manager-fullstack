import { useState } from "react";

// Toast
import { AppToast } from "./AppToast";

const CreateTaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      AppToast({
        type: "error",
        message: "❌ O título da tarefa não pode estar vazio!",
      });
      return;
    }

    onCreateTask({
      title,
      description,
    });

    AppToast({
      type: "success",
      message: "✅ Tarefa criada com sucesso!",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-md font-bold mb-4 text-center text-gray-700 font-sans">
        Criar Nova Tarefa
      </h2>

      <input
        type="text"
        placeholder="Título da tarefa"
        className="w-full border border-gray-300 p-2 rounded-lg mb-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descrição da tarefa"
        className="w-full border border-gray-300 p-2 rounded-lg mb-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 w-full rounded-lg font-medium text-sm">
        Criar
      </button>
    </form>
  );
};

export default CreateTaskForm;
