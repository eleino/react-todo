import { categories } from "../../../utils/localStorage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datepicker.css";

type TodoFormProps = {
  values: {
    title: string;
    description: string;
    category: string;
    dueAt?: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

const TodoForm = ({ values, onChange }: TodoFormProps) => {
  return (
    <>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={onChange}
        placeholder="Todo Title"
        required
      />
      <textarea
        name="description"
        value={values.description}
        onChange={onChange}
        placeholder="Todo Description"
        rows={5}
        cols={30}
      />
      <select name="category" value={values.category} onChange={onChange}>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <DatePicker
        selected={values.dueAt ? new Date(values.dueAt) : null}
        onChange={(date: Date | null) =>
          onChange({
            target: {
              name: "dueAt",
              value: date ? date.toISOString() : "",
            },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        placeholderText="Select Due Date"
        dateFormat="dd/MM/yyyy HH:mm"
        className="date-picker"
        showTimeSelect
        minDate={new Date()}
        timeIntervals={15}
        isClearable
        timeCaption="Time"
        timeFormat="HH:mm"
      />
    </>
  );
};

export default TodoForm;
