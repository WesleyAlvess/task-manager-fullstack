import { useState } from "react";
// imports
import { AppToast } from "./AppToast";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });

    // Chama o toast de sucesso
    AppToast({ type: "success", message: `✏️ Tarefa "${title}" atualizada com sucesso!` });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">

        <h2 className="text-lg font-bold mb-4">Editar tarefa</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border p-2 rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Salvar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditTaskModal;
