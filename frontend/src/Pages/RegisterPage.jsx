import { useState } from "react";
import { register } from "../services/api";
import { AppToast } from "../components/tasks/AppToast";

const RegisterPage = ({ goToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      AppToast({
        type: "error",
        message: "⚠️ Preencha todos os campos",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      AppToast({
        type: "error",
        message: "⚠️ Email inválido",
      });
      return;
    }

    if (password.length < 6) {
      AppToast({
        type: "error",
        message: "⚠️ A senha deve ter no mínimo 6 caracteres",
      });
      return;
    }

    try {
      await register({ name, email, password });

      AppToast({
        type: "success",
        message: "🎉 Conta criada com sucesso!",
      });

      goToLogin();
    } catch (error) {
      console.error(error);

      AppToast({
        type: "error",
        message: error.response?.data?.message || "❌ Erro ao criar conta",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Bem-vindo ao Tasks
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Crie sua conta para começar a organizar tarefas
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Criar Conta
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-sm text-gray-500">Já tem uma conta?</p>

          <button
            onClick={goToLogin}
            className="mt-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
