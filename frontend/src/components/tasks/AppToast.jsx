// AppToast.jsx
import toast from "react-hot-toast";

export const AppToast = ({ type, message }) => {
  // Define cores e estilos por tipo
  const colors = {
    success: { bg: "#e6ffed", text: "#064e3b" },
    error: { bg: "#fee2e2", text: "#991b1b" },
    info: { bg: "#dbeafe", text: "#1e3a8a" },
  };

  const { bg, text } = colors[type] || colors.info;

  // Exibe o toast
  toast(message, {
    duration: 3000,          // 3 segundos
    position: "top-center",  // aparece no topo da tela
    style: {
      background: bg,
      color: text,
      padding: "12px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
  });
};
