// ConfirmDeleteToast.jsx
import toast from "react-hot-toast";

export const ConfirmDeleteToast = ({ itemName, onConfirm }) => {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <p>Tem certeza que deseja deletar a tarefa, {itemName}?</p>
      <div className="flex justify-end gap-2">
        <button
          className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
            toast.success(`🗑 ${itemName} deletado!`);
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  ));
};
