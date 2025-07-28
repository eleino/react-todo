import { Route, Routes } from 'react-router'
import './styles/todos.css'
import { Dashboard } from './components/Dashboard'
import AddTodo from './components/Todos/AddTodo'
import ViewTodo from './components/Todos/ViewTodo'
import EditTodo from './components/Todos/EditTodo'
import NotFound from './components/NotFound'

function App() {

  return (
    <div className="pageContainer">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addtodo" element={<AddTodo />} />
        <Route path="/todo/:todoId" element={<ViewTodo />} />
        <Route path="/todo/:todoId/edit" element={<EditTodo />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
