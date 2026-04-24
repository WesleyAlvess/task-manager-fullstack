import UserProfile from "../user/UserProfile";
import CreateTaskForm from "../tasks/CreateTaskForm";
import Estatisticas from "../tasks/Estatisticas";

const Sidebar = ({ onCreateTask, tasks }) => {
  return (
    <div className="h-full bg-white p-5">

      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        TaskFlow
      </h2>

      <UserProfile />

      <div className="mt-6">
        <CreateTaskForm onCreateTask={onCreateTask} />
      </div>

      <div className="mt-6">
        <Estatisticas tasks={tasks} />
      </div>

    </div>
  );
};

export default Sidebar;
