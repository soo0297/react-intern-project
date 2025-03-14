"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  contents: string;
  completed: boolean;
};

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:4000/todos");
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  if (!todos) {
    return <div>할 일 목록이 없습니다!</div>;
  }

  const todosList = todos.filter((todo) => todo.completed === false);
  const completedList = todos.filter((todo) => todo.completed === true);

  return (
    <div>
      <h1>Todos</h1>
      <h2>해야할 일</h2>
      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.completed ? "완료됨" : "미완료됨"}</p>
          </li>
        ))}
      </ul>
      <h2>완료된 일</h2>
      <ul>
        {completedList.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.completed ? "완료됨" : "미완료됨"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
