// Toast
import { AppToast } from "../tasks/AppToast";

//Context
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// API
import { uploadAvatar } from "../../services/api"


const UserProfile = () => {
  //Context
  const { user, token, setUser } = useContext(AuthContext)

  // Logout
  const logout = () => {
    try {
      localStorage.removeItem("token")
      AppToast({
        type: "success",
        message: "👋 Você saiu da conta!"
      })
      setTimeout(() => {
        window.location.href = "/login"
      }, 1200)
    } catch (error) {
      console.error(error)
    }
  }

  // Upload do avatar
  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const res = await uploadAvatar(token, file)

      setUser((prev) => {
        const updateUser = { ...prev, avatar: res.data.avatar }
        localStorage.setItem("user", JSON.stringify(updateUser))
        return updateUser
      })

      AppToast({
        type: "success",
        message: "Avatar atualizado!"
      })

    } catch (error) {
      console.error(error)
      AppToast({
        type: "error",
        message: "Erro ao atualizar avatar"
      })
    }
  }


  return (
    <div>
      {/* Cabeçalho com perfil */}
      <div className="border-b pb-4 mb-8">
        {/* usuário */}
        <div className="flex items-center gap-3 mb-4">

          {user?.avatar ? (
            <img
              src={user?.avatar ? `http://localhost:3000/${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg"}
              alt="Foto do usuário"
              className="w-13 h-13 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-13 h-13 rounded-full bg-gray-300 flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <p className=" text-gray-700 font-sans">
              Olá, {user?.name?.split(" ")[0]}
            </p>
            <p className="text-xs text-gray-700 font-sans truncate">
              {user?.email} Email
            </p>
          </div>
        </div>

        {/* botões */}
        <div className="flex gap-2">
          <label className="flex-1 text-center cursor-pointer border px-1 py-1 rounded-lg text-sm hover:bg-gray-100 transition">
            Upload foto
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
          </label>

          <button
            onClick={logout}
            className="flex-1 bg-red-500 text-white px-1 py-1 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
