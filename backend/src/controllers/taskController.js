import Task from "../models/Task.js";

// @desc    Buscar todas as tarefas do usuário logado
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Criar nova tarefa
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Título da tarefa é obrigatório");
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Atualizar tarefa
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Tarefa não encontrada");
    }

    // Verifica se pertence ao usuário
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Não autorizado");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Deletar tarefa
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Tarefa não encontrada");
    }

    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Não autorizado");
    }

    await task.deleteOne();

    res.json({ message: "Tarefa removida" });
  } catch (error) {
    next(error);
  }
};
