import { useTodos } from "../../../hooks/useTodos";
import { NavLink, useParams } from "react-router";
import { format } from "date-fns";

const ViewTodo = () => {
  const { todos, handleDelete } = useTodos();
  const { todoId } = useParams();
  const todo = todos.find((todo) => todo.id === todoId);
  return (
    <div className="view-todo-container">
      <NavLink to="/" className="back-link">
        Back to Dashboard
      </NavLink>
      {todo ? (
        <div className="todo-details">
          <h2>TODO: {todo.title}</h2>
          <p>{todo.description}</p>
          <p>Status: {todo.completed ? "Done" : "Not done"}</p>
          <p>Category: {todo.category}</p>
          <p>
            Due at:{" "}
            {todo.dueAt
              ? format(new Date(todo.dueAt), "dd/MM/yyyy HH:mm")
              : "Not set"}
          </p>
          <p>
            Created at: {format(new Date(todo.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
          {todo.completedAt && (
            <p>
              Completed at:{" "}
              {format(new Date(todo.completedAt), "dd/MM/yyyy HH:mm")}
            </p>
          )}

          <span className="todo-buttons">
            <NavLink to={`/todo/${todo.id}/edit`}>Edit</NavLink>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </span>
        </div>
      ) : (
        <p>Todo not found</p>
      )}
    </div>
  );
};

export default ViewTodo;
