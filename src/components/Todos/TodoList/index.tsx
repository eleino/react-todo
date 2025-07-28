import { SmallButton } from "../../buttons/SmallButton";
import type { Todo } from "../../../types/Todo";
import { useTodos } from "../../../hooks/useTodos";
import { NavLink } from "react-router";
import { format } from "date-fns";
import { useState } from "react";
import { categories } from "../../../utils/localStorage";

const TodoList = () => {
  const { todos, handleDelete, handleDone } = useTodos();
  const [filter, setFilter] = useState("all"); // for completion status filter
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // change filter by category
  const changeFilter = (category: string) => {
    if (filteredCategories.includes(category)) {
        setFilteredCategories(filteredCategories.filter((c) => c !== category));
    } else {
        setFilteredCategories([...filteredCategories, category]);
    }
  };

  // sort by due date if set
  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.dueAt && !b.dueAt) return 0;
    if (!a.dueAt) return 1;
    if (!b.dueAt) return -1;
    return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
  });
  return (
    <div className="todo-list-container">
      <h2>Your Todos</h2>
      <div className="topbar">
        <span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="">Show All</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not Completed</option>
          </select>
        </span>
        <NavLink to="/addtodo" className="add-todo-link">
          Add Todo
        </NavLink>
        <span className="category-filter">
            {categories.map((category) => (
              <span key={category.name} className="category-item">
                <input
                  type="checkbox"
                  id={`category-${category.name}`}
                  checked={filteredCategories.includes(category.name)}
                  onChange={() => changeFilter(category.name)}
                />
                <label htmlFor={`category-${category.name}`}>{category.name}</label>
              </span>
            ))}
          </span>
      </div>
      <div className="todo-list">
        {sortedTodos
          .filter((todo) => { // filter by completion status
            if (filter === "completed") return todo.completed;
            if (filter === "not-completed") return !todo.completed;
            return true;
          })
            .filter((todo) => { // filter by category
                if (filteredCategories.length === 0) return true;
                return filteredCategories.includes(todo.category);
            })
          .map((todo: Todo) => {
            const dueDate = todo.dueAt ? new Date(todo.dueAt) : null;
            const now = new Date();
            return (
              <div key={todo.id} className="todo-item">
                <span>
                  <SmallButton
                    onClick={() => handleDone(todo.id)}
                    icon={
                      todo.completed
                        ? "./src/assets/icons/check-green.svg"
                        : "./src/assets/icons/check-grey.svg"
                    }
                    hint={todo.completed ? "Mark as undone" : "Mark as done"}
                  />
                  <span className="todo-category">{todo.category}</span>
                  <span className="todo-title">
                    <NavLink to={`/todo/${todo.id}`}>{todo.title}</NavLink>
                  </span>
                </span>
                <span>
                  <span
                    className={`todo-due-date ${
                      dueDate && dueDate < now ? "overdue" : ""
                    }`}
                  >
                    {dueDate
                      ? format(dueDate, "dd/MM/yyyy HH:mm")
                      : "No due date"}
                  </span>
                  <SmallButton
                    onClick={() => handleDelete(todo.id)}
                    icon="./src/assets/icons/delete.svg"
                    hint="Delete this todo"
                  />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodoList;
