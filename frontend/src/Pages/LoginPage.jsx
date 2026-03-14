//Imports
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/api";

// Toast
import { AppToast } from "../components/tasks/AppToast";

const LoginPage = ({ goToRegister }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      AppToast({
        type: "error",
        message: "⚠️ Preencha email e senha"
      });
      return;
    }
    try {
      const res = await loginService({ email, password });
      AppToast({
        type: "success",
        message: "✅ Login realizado com sucesso!"
      })
      setTimeout(() => {
        login(res.data.token, res.data.user);
      }, 1200);
    } catch (error) {
      AppToast({
        type: "error",
        message: "❌ Email ou senha inválidos"
      });
      console.error("LoginPage - erro na requisição:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

        {/* título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Bem-vindo ao Tasks
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Organize suas tarefas de forma simples
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            // disabled={!email || !password}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Entrar
          </button>

        </form>

        {/* criar conta */}
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Não tem uma conta?
          </p>

          <button onClick={goToRegister}
            className="mt-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            Criar Conta
          </button>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;
