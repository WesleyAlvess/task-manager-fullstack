// Components
import UserProfile from "../user/UserProfile";
import CreateTaskForm from "../tasks/CreateTaskForm"
import logo from "../../assets/taskflow-logo.svg";

const Sidebar = ({ onCreateTask, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className={`
    fixed top-0 left-0 z-50 h-full w-80 bg-gray-100 p-6
    shadow-[2px_0_8px_rgba(0,0,0,0.12)]
    transform transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:w-75 md:h-full
    `}>
      <div className="flex justify-end md:hidden">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="TaskFlow" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Task<span className="text-blue-500">Manager</span>
        </h1>
      </div>
      <UserProfile />
      <div className="mt-6">
        <CreateTaskForm onCreateTask={onCreateTask} />
      </div>
    </div>
  );
};

export default Sidebar;
