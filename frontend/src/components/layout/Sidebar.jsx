// Components
import UserProfile from "../user/UserProfile";
import CreateTaskForm from "../tasks/CreateTaskForm"

const Sidebar = ({ onCreateTask, tasks }) => {
  return (
    <div className="w-75 h-full bg-gray-100 p-6 shadow-[2px_0_8px_rgba(0,0,0,0.12)]">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        SaaS Task Manager
      </h1>
      <UserProfile />
      <div className="mt-6">
        <CreateTaskForm onCreateTask={onCreateTask} />
      </div>
    </div>
  );
};

export default Sidebar;
