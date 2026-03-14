// Components
import UserProfile from "../user/UserProfile";
import CreateTaskForm from "../tasks/CreateTaskForm"
import Estatisticas from "../tasks/Estatisticas";

const Sidebar = ({ onCreateTask, tasks }) => {
  return (
    <div className="w-75 h-full bg-gray-100 p-6 shadow-[2px_0_8px_rgba(0,0,0,0.12)]">
      <h2 className="text-xl font-bold mb-5 text-center text-gray-700 font-sans">Saas Taks Manager</h2>
      <UserProfile />
      <div className="mt-6">
        <CreateTaskForm onCreateTask={onCreateTask} />
      </div>
      <div>
        <Estatisticas tasks={tasks} />
      </div>
    </div>
  );
};

export default Sidebar;
