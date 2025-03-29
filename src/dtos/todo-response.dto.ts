import { Todo } from '@prisma/client';

export class TodoResponseDTO {
  id: number;
  title: string;
  completed: boolean;

  static from(todo: Todo): TodoResponseDTO {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    };
  }
}
