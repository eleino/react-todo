import TodoForm from "../TodoForm";
import { useParams, useNavigate, NavLink } from "react-router";
import { useTodos } from "../../../hooks/useTodos";
import { updateTodo } from "../../../utils/localStorage";
import { useState } from "react";
import type { Todo } from "../../../types/Todo";

const EditTodo = () => {
  const { todoId } = useParams();
  const { todos } = useTodos();
  const navigate = useNavigate();

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) {
    // go back to main page if todo not found
    setTimeout(() => {
      navigate("/");
    }, 1000);
    return <p>Todo not found</p>;
  }

  const [values, setValues] = useState<Todo>(todo);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const editedTodo: Todo = {
      id: todo.id,
      title: values.title,
      description: values.description,
      completed: values.completed,
      createdAt: values.createdAt || new Date().toISOString(),
      category: values.category,
      dueAt: values.dueAt || undefined,
      completedAt: values.completedAt || undefined,
    };
    updateTodo(editedTodo);
    navigate("/");
  };

  return (
    <div>
      <NavLink to="/" className="back-link">
        Back to Dashboard
      </NavLink>

      <h2>Edit Todo</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <TodoForm values={values} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTodo;
