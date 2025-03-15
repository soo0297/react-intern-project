"use client";

import InputForm from "@/components/InputForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, deleteTodo, toggleTodo, Todo } from "@/api/todos";

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
    <div className="flex flex-col">
      <div className="w-full bg-[#7cabdd] h-16 md:h-20 xl:h-24 flex justify-center items-center mb-8 rounded-lg">
        <h1 className="font-bold text-white text-xl md:text-3xl xl:text-5xl">
          TODO List
        </h1>
      </div>
      <div className="px-12">
        <div className="bg-[#d9ebfa] rounded-lg h-12 md:h-16 xl:h-20 flex justify-center items-center px-2 mb-8">
          <InputForm />
        </div>
        <div className="flex flex-col md:flex-row xl:flex-row justify-center gap-12">
          <div className="w-96 mx-auto">
            <h2 className="font-bold text-black text-xl text-center mb-2">
              해야할 일
            </h2>
            <ul className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-3">
              {todosList.map((todo) => (
                <li key={todo.id} className="flex justify-between border p-2">
                  <div>
                    <h3 className="font-bold">{todo.title}</h3>
                    <p>{todo.contents}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="w-10 border rounded-lg bg-[#db4c3f] text-white"
                      onClick={() => deleteTodoMutation.mutate(todo.id)}
                    >
                      삭제
                    </button>
                    <button
                      className="w-10 border rounded-lg bg-[#44a273] text-white"
                      onClick={() => toggleTodoMutation.mutate(todo)}
                    >
                      완료
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-96 mx-auto">
            <h2 className="font-bold text-black text-xl text-center mb-2">
              완료된 일
            </h2>
            <ul className="border-2 border-gray-300 rounded-md p-4 flex flex-col gap-3">
              {completedList.map((todo) => (
                <li key={todo.id} className="flex justify-between border p-2">
                  <div>
                    <h3 className="font-bold">{todo.title}</h3>
                    <p>{todo.contents}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="w-10 border rounded-lg bg-[#db4c3f] text-white"
                      onClick={() => deleteTodoMutation.mutate(todo.id)}
                    >
                      삭제
                    </button>
                    <button
                      className="w-10 border rounded-lg bg-[#a8ceef] text-white"
                      onClick={() => toggleTodoMutation.mutate(todo)}
                    >
                      취소
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
