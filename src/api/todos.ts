// src/api/todos.ts
import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  contents: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(
    "https://brawny-climbing-ghoul.glitch.me/todos/"
  );
  return response.data;
};

export const addTodo = async (newTodo: Omit<Todo, "id" | "completed">) => {
  const response = await axios.post(
    "https://brawny-climbing-ghoul.glitch.me/todos",
    {
      ...newTodo,
      completed: false,
    }
  );
  return response.data;
};

export const deleteTodo = async (todoId: string) => {
  await axios.delete(`https://brawny-climbing-ghoul.glitch.me/todos/${todoId}`);
};

export const editTodo = async (todo: Todo) => {
  await axios.patch(
    `https://brawny-climbing-ghoul.glitch.me/todos/${todo.id}`,
    {
      contents: todo.contents,
    }
  );
};

export const toggleTodo = async (todo: Todo) => {
  await axios.patch(
    `https://brawny-climbing-ghoul.glitch.me/todos/${todo.id}`,
    {
      completed: !todo.completed,
    }
  );
};
