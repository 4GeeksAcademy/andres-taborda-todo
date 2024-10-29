import { useEffect, useReducer, useState } from 'react'

import './App.css'
import { TodoList } from './components/TodoList'
import { FormAddTodo } from './components/FormAddTodo'
import { v4 as uuidv4 } from 'uuid';
import { Footer } from './components/Footer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { localStorageReducer } from './reducer/localStorageReducer';

function App() {
  const [todos, setTodos] = useState([])
  const [state, dispatch] = useReducer(localStorageReducer, todos)
  

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
      title: title,
      isSaved: false
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const handleRemoveTodo = (id) => {
    const updateTodoList = todos.filter(todo => todo.id !== id)
    setTodos(updateTodoList)
  }
  
  const handleSavedStorageTodo = (id) => {
    dispatch({type: "save_todo", id: id, todos: todos})
    
    //setTodos(state)
  }

  const handleDeleteStorageTodo = (id) => {    
    dispatch({type: "remove_todo", id: id, todos: todos})
    // const listTodos = [...todos]
    // const todoToSaved = listTodos.find(todo => todo.id === id)

    // if (todoToSaved) {
    //   todoToSaved.isSaved = false
    //   setTodos(listTodos)
    //   localStorage.setItem("todos", JSON.stringify(
    //     listTodos.filter(todo => todo.isSaved === true)
    //   ))      
    // }
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
    setTodos(savedTodos)
    
  }, []);

  return (
    <section className='todoapp'>
      <header className='header'>        
        <h1>todos</h1> 
        <FormAddTodo createTodo={handleAddTodo}/>     
      </header>
      {
        todos.length > 0 ? <TodoList todos={todos} removeTodos={handleRemoveTodo} lockTodo={handleSavedStorageTodo} unLockTodo={handleDeleteStorageTodo}/> : <p>No hay tareas, añadir tareas</p>
      }
      <Footer todoItems={todos.length}/>      
    </section>
  )
}

export default App
