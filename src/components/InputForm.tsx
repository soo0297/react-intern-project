import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/api/todos";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  // 추가
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      setContents("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate({ title, contents });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-3"
    >
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-center border-b-2 border-white rounded-lg"
      />
      <input
        type="text"
        placeholder="내용"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        className="text-center border-b-2 border-white rounded-lg"
      />
      <button className="bg-white w-12 h-8 rounded-lg">추가</button>
    </form>
  );
};

export default InputForm;
