import toast from "react-hot-toast";

export const ConfirmDeleteToast = ({ itemName, onConfirm }) => {
  toast.dismiss();

  toast(
    (t) => (
      <div className="text-sm max-w-[280px]">
        <p className="mb-3">
          Deletar <b>{itemName}</b>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded-lg text-gray-700"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>

          <button
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);

              setTimeout(() => {
                toast.success(`🗑 ${itemName} deletado!`, {
                  duration: 1800,
                  position: "top-center",
                  style: {
                    maxWidth: "90vw",
                    fontSize: "14px",
                    borderRadius: "12px",
                    padding: "10px 14px",
                  },
                });
              }, 100);
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    ),
    {
      duration: 3500,
      position: "top-center",
      style: {
        maxWidth: "90vw",
        borderRadius: "12px",
        padding: "12px",
      },
    }
  );
};
