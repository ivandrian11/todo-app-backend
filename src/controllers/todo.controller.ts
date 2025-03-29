import { Request, Response } from 'express';
import { CreateTodoDTO } from '../dtos/create-todo.dto';
import { UpdateTodoDTO } from '../dtos/update-todo.dto';
import { TodoResponseDTO } from '../dtos/todo-response.dto';
import prisma from '../prismaCLient';

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();
    const todosResponse: TodoResponseDTO[] = todos.map((todo) =>
      TodoResponseDTO.from(todo)
    );

    res.json({
      status: 'success',
      data: todosResponse,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil data todo.',
    });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      res.status(404).json({
        status: 'fail',
        message: 'Todo tidak ditemukan.',
      });
      return;
    }

    res.json({
      status: 'success',
      data: TodoResponseDTO.from(todo),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil data todo.',
    });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const requestBpdy: CreateTodoDTO = req.body;
    const newTodo = await prisma.todo.create({
      data: { ...requestBpdy },
    });

    res.status(201).json({
      status: 'success',
      message: 'Todo berhasil ditambahkan',
      data: TodoResponseDTO.from(newTodo),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat menambahkan todo.',
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const existingTodo = await prisma.todo.findUnique({ where: { id } });

    if (!existingTodo) {
      res.status(404).json({
        status: 'fail',
        message: 'Todo tidak ditemukan',
      });
      return;
    }

    const requestBpdy: UpdateTodoDTO = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { ...requestBpdy },
    });

    res.json({
      status: 'success',
      message: 'Todo berhasil diperbarui',
      data: TodoResponseDTO.from(updatedTodo),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat memperbarui todo.',
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const existingTodo = await prisma.todo.findUnique({ where: { id } });

    if (!existingTodo) {
      res.status(404).json({
        status: 'fail',
        message: 'Todo tidak ditemukan',
      });
      return;
    }

    await prisma.todo.delete({ where: { id } });
    res.json({
      status: 'success',
      message: 'Todo berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat menghapus todo.',
    });
  }
};
