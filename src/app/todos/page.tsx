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
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/todos", {
      title: title,
      contents: contents,
      completed: false,
    });

    setTodos([...todos, response.data]);
  };

  const handleDelete = async (todoId: string) => {
    await axios.delete(`http://localhost:4000/todos/${todoId}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const handleSwitch = async (todo: Todo) => {
    await axios.patch(`http://localhost:4000/todos/${todo.id}`, {
      completed: !todo.completed,
    });

    setTodos((prev) =>
      prev.map((todo) => {
        return { ...todo, completed: !todo.completed };
      })
    );
  };

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button>추가</button>
      </form>

      <h2>해야할 일</h2>
      <ul className="border-2 border-gray-300 rounded-md p-4">
        {todosList.map((todo) => (
          <li key={todo.id} className="border p-2">
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.completed ? "완료됨" : "미완료됨"}</p>
            <button className="border" onClick={() => handleDelete(todo.id)}>
              삭제
            </button>
            <button className="border" onClick={() => handleSwitch(todo)}>
              완료
            </button>
          </li>
        ))}
      </ul>

      <h2>완료된 일</h2>
      <ul className="border-2 border-gray-300 rounded-md p-4">
        {completedList.map((todo) => (
          <li key={todo.id} className="border p-2">
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <p>{todo.completed ? "완료됨" : "미완료됨"}</p>
            <button className="border" onClick={() => handleDelete(todo.id)}>
              삭제
            </button>
            <button className="border" onClick={() => handleSwitch(todo)}>
              취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
