"use client";

import InputForm from "@/components/InputForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, deleteTodo, toggleTodo, Todo } from "@/api/todos"; // ✅ Todo 타입 가져오기

const TodosPage = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <div>로딩 중...</div>;

  const todosList = todos.filter((todo) => !todo.completed);
  const completedList = todos.filter((todo) => todo.completed);

  return (
    <div>
      <h1>Todos</h1>

      <InputForm />

      <h2>해야할 일</h2>
      <ul className="border-2 border-gray-300 rounded-md p-4">
        {todosList.map((todo) => (
          <li key={todo.id} className="border p-2">
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <button
              className="border"
              onClick={() => deleteTodoMutation.mutate(todo.id)}
            >
              삭제
            </button>
            <button
              className="border"
              onClick={() => toggleTodoMutation.mutate(todo)}
            >
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
            <button
              className="border"
              onClick={() => deleteTodoMutation.mutate(todo.id)}
            >
              삭제
            </button>
            <button
              className="border"
              onClick={() => toggleTodoMutation.mutate(todo)}
            >
              취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
