import { useState } from 'react'

import './App.css'
import { TodoList } from './components/TodoList'
import { FormAddTodo } from './components/FormAddTodo'
import { v4 as uuidv4 } from 'uuid';
import { Footer } from './components/Footer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {
  const [todos, setTodos] = useState([])

  const showSwal = () => {
    withReactContent(Swal).fire({
      icon: "error",
      title: <i>Something wrong!</i>,
      text: 'Task already exists',
      
    })
  }
  
  const handleAddTodo = (title) => {
    const wasAdded = todos.filter(task => task.title.toUpperCase() === title.toUpperCase())
    if (wasAdded.length > 0) {
      showSwal()
      return
    }
    const newTodo = {
      id: uuidv4(),
      title: title
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const handleRemoveTodo = (id) => {
    const updateTodoList = todos.filter(todo => todo.id !== id)
    setTodos(updateTodoList)
  }
  

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1> 
        <FormAddTodo createTodo={handleAddTodo}/>     
      </header>
      {
        todos.length > 0 ? <TodoList todos={todos} removeTodos={handleRemoveTodo}/> : <p>No hay tareas, añadir tareas</p>
      }
      <Footer todoItems={todos.length}/>      
    </section>
  )
}

export default App
