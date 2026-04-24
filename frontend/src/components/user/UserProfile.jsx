import { AppToast } from "../tasks/AppToast";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { uploadAvatar } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const UserProfile = () => {
  const { user, token, setUser } = useContext(AuthContext);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      AppToast({
        type: "success",
        message: "👋 Você saiu da conta!",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadAvatar(token, file);

      setUser((prev) => {
        const updatedUser = { ...prev, avatar: res.data.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

      AppToast({
        type: "success",
        message: "Avatar atualizado!",
      });
    } catch (error) {
      console.error(error);

      AppToast({
        type: "error",
        message: "Erro ao atualizar avatar",
      });
    }
  };

  const avatarUrl = user?.avatar
    ? `${API_URL}/${user.avatar}`
    : null;

  return (
    <div>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Foto do usuário"
              className="w-13 h-13 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-13 h-13 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <p className="text-gray-800 font-medium">
              Olá, {user?.name?.split(" ")[0] || "Usuário"}
            </p>

            <p className="text-xs text-gray-500 truncate max-w-[180px]">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <label className="flex-1 text-center cursor-pointer border border-gray-300 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition">
            Upload
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>

          <button
            onClick={logout}
            className="flex-1 bg-red-500 text-white px-2 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
