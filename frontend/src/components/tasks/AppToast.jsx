import toast from "react-hot-toast";

export const AppToast = ({ type, message }) => {
  const colors = {
    success: { bg: "#ffffff", text: "#1f2937" },
    error: { bg: "#ffffff", text: "#991b1b" },
    info: { bg: "#ffffff", text: "#1e3a8a" },
  };

  const { bg, text } = colors[type] || colors.info;

  toast.dismiss();

  toast(message, {
    duration: 1800,
    position: "top-center",
    style: {
      background: bg,
      color: text,
      padding: "10px 14px",
      borderRadius: "12px",
      fontWeight: "500",
      fontSize: "14px",
      maxWidth: "90vw",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
  });
};
