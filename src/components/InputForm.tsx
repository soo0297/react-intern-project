import { Todo } from "@/app/page";
import axios from "axios";
import React, { useState } from "react";

const InputForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/todos", {
      title: title,
      contents: contents,
      completed: false,
    });

    setTodos([...todos, response.data]);
  };

  return (
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
  );
};

export default InputForm;
