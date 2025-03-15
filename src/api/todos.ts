// src/api/todos.ts
import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  contents: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get("http://localhost:4000/todos");
  return response.data;
};

export const addTodo = async (newTodo: Omit<Todo, "id" | "completed">) => {
  const response = await axios.post("http://localhost:4000/todos", {
    ...newTodo,
    completed: false,
  });
  return response.data;
};

export const deleteTodo = async (todoId: string) => {
  await axios.delete(`http://localhost:4000/todos/${todoId}`);
};

export const toggleTodo = async (todo: Todo) => {
  await axios.patch(`http://localhost:4000/todos/${todo.id}`, {
    completed: !todo.completed,
  });
};
