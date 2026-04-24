import Sidebar from "../components/layout/Sidebar";
import TaskList from "../components/tasks/TaskList";
import Rodape from "../components/layout/Rodape";
import TaskModal from "../components/tasks/TaskModal";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getTasks(token).then((res) => setTasks(res.data));
    }
  }, [token]);

  const handleCreateTask = async (taskData) => {
    const res = await createTask(token, taskData);
    setTasks([...tasks, res.data]);
    setSidebarOpen(false);
  };

  const handleToggle = async (task) => {
    const res = await updateTask(token, task._id, {
      completed: !task.completed,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  const handleEdit = (task) => setEditingTask(task);

  const handleUpdateTask = async (updatedData) => {
    const res = await updateTask(token, editingTask._id, updatedData);

    setTasks(tasks.map((t) =>
      t._id === editingTask._id ? res.data : t
    ));

    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(token, id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="md:hidden shrink-0 z-30 bg-gray-100 px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-white p-3 rounded-xl shadow-sm border border-gray-200"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      </header>

      <div className="flex flex-1 w-full overflow-hidden">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white transform transition-transform duration-300 overflow-y-auto
          md:static md:translate-x-0 md:shadow-md md:shrink-0
          ${sidebarOpen ? "translate-x-0 shadow-md" : "-translate-x-[120%] shadow-none"}`}
        >
          <Sidebar onCreateTask={handleCreateTask} tasks={tasks} />
        </aside>

        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6">
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      <div className="shrink-0">
        <Rodape />
      </div>

      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
