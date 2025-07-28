import type { Todo } from "../../../types/Todo";
import TodoForm from "../TodoForm";
import { addTodo, categories } from "../../../utils/localStorage";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router";

const AddTodo = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: categories[0].name,
    dueAt: undefined,
  });
  const navigate = useNavigate();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      completed: false,
      createdAt: new Date().toISOString(),
      category: values.category,
      dueAt: values.dueAt || undefined,
      completedAt: undefined,
    };
    addTodo(newTodo);
    navigate("/");
  };

  return (
    <div className="add-todo">
      <NavLink to="/" className="back-link">
        Back to Dashboard
      </NavLink>

      <h2>Add Todo</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <TodoForm values={values} onChange={handleChange} />
        <button className="add-todo-button">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
