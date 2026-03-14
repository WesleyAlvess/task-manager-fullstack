// useContext
import { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// pages
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage"
import Dashboard from "./Pages/Dashboard"


const MainApp = () => {
  const { token } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);


  return (
    <>
      {/* Toast sempre disponível */}
      <Toaster position="top-right" />

      {!token ? (
        showRegister ? (
          <RegisterPage goToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginPage goToRegister={() => setShowRegister(true)} />
        )
      ) : (
        <Dashboard />
      )}
    </>
  )
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
