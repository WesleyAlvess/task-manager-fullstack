// Components
import Sidebar from "../components/layout/Sidebar";
import TaskList from "../components/tasks/TaskList";
import Rodape from "../components/layout/Rodape";
import TaskModal from "../components/tasks/TaskModal";

//imports hooks
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//import API
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  // Token
  const { token } = useContext(AuthContext);

  //States
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)


  //Buscar Tarefas
  useEffect(() => {
    if (token) {
      getTasks(token).then((res) => setTasks(res.data))
    }
  }, [token])

  //Criar tarefa
  const handleCreateTask = async (taskData) => {
    const res = await createTask(token, taskData)
    setTasks([...tasks, res.data])
  }

  // Atualiza Check na tarefa
  const handleToggle = async (task) => {
    const updateData = {
      completed: !task.completed
    }
    const res = await updateTask(token, task._id, updateData)
    setTasks(tasks.map(t => t._id === task._id ? res.data : t))
  }

  // Abrir modal editar tarefa
  const handleEdit = (task) => {
    setEditingTask(task)
  }
  // Salvar atualização
  const handleUpdateTask = async (updatedData) => {
    const res = await updateTask(token, editingTask._id, updatedData)
    setTasks(tasks.map(t =>
      t._id === editingTask._id ? res.data : t
    ))
    setEditingTask(null)
  }

  // Deletar tarefa
  const handleDelete = async (id) => {
    await deleteTask(token, id)
    setTasks(tasks.filter(task => task._id !== id))
  }



  return (
    <div className="flex flex-col h-screen">
      {/* área principal */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onCreateTask={handleCreateTask} tasks={tasks} />
        <div className="flex-1 p-6 overflow-y-auto">
          <TaskList tasks={tasks} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      {editingTask && (
        <TaskModal task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTask} />
      )}
      {/* footer */}
      <Rodape />
    </div>
  );
};

export default Dashboard;
