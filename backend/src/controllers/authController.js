import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se já existe usuário
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Usuário já existe");
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Dados inválidos");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Busca usuário
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Credenciais inválidas");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar
// @route   POST /api/auth/avatar
// @access  Private
export const uploadAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    // Verifica se o img existe
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" })
    }

    // Limita tipo img
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Tipo de arquivo não permitido" });
    }

    // Limita tamanho img
    if (req.file.size > 2 * 1024 * 1024) { // 2MB
      return res.status(400).json({ message: "Arquivo muito grande (máx 2MB)" });
    }

    // Apagar avatar antigo
    if (user.avatar && fs.existsSync(user.avatar)) {
      fs.unlinkSync(user.avatar)
    }

    // Salvar novo
    user.avatar = req.file.path

    await user.save()

    res.json({
      message: "Avatar atualizado",
      avatar: user.avatar
    })

  } catch (error) {
    next(error);
  }
}
