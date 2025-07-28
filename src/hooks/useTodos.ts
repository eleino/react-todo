import { useState } from "react";
import { getTodos, deleteTodo, toggleTodoCompletion } from "../utils/localStorage";
import type { Todo } from "../types/Todo";

// hook to manage todos to use in multiple components
export function useTodos() {
  const [todos, setTodosState] = useState<Todo[]>(getTodos());

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
      setTodosState(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  };

  const handleDone = (id: string) => {
    toggleTodoCompletion(id);
    setTodosState(getTodos());
  };

  return { todos, handleDelete, handleDone };
}