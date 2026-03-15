// Imports Task Model
import Task from "../models/Task.js";
// Import Funcão Calcular Reminder
import { calculateReminder } from "../utils/calculateReminder.js"

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
    const { title, description, deadline, reminderMinutesBefore } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Título da tarefa é obrigatório");
    }

    //Transforma a string do front em Date
    const deadlineDate = new Date(deadline)

    // Garante que reminderMinutesBefore seja número válido
    const minutesBefore = reminderMinutesBefore != null ? Number(reminderMinutesBefore) : 30

    // Calcula reminderAt corretamente usando o Date e minutos válidos
    const reminderAt = calculateReminder(deadlineDate, minutesBefore);

    //Cria a task no banco
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline: deadlineDate,
      reminderMinutesBefore: reminderMinutesBefore ?? 30, // default 30 min
      reminderAt, //horário do lembrete
      reminderSent: false, // garante que ainda não foi enviado
    });

    //Retorna a task criada
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
