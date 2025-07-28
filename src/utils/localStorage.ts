import type { Todo } from '../types/Todo';
// for managing todos in local storage

export const categories = [
  { name: 'Work' },
  { name: 'School' },
  { name: 'Misc' },
];

export const getTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export const addTodo = (todo: Todo) => {
  const todos = getTodos();
  todos.push(todo);
  saveTodos(todos);
}

export const updateTodo = (updatedTodo: Todo) => {
  const todos = getTodos();
  const index = todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    saveTodos(todos);
  }
}

export const toggleTodoCompletion = (id: string) => {
  const todos = getTodos();
  const todo = todos.find((todo: Todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : undefined;
    saveTodos(todos);
  }
};

export const deleteTodo = (id: string) => {
  const todos = getTodos();
  const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
  saveTodos(updatedTodos);
}