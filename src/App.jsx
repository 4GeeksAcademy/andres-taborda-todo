import { useReducer } from 'react';


import './App.css';
import { Footer } from './components/Footer';
import { FormAddTodo } from './components/FormAddTodo';
import { TodoList } from './components/TodoList';
import { todoReducer } from './reducers/todosReducer';

const initialTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || []
}

function App() {
  const [state, dispatch] = useReducer(todoReducer,null,initialTodos)
  
  
   const handleAddTodo = (title) => {
    dispatch({type: "add_todo", payload: { title: title }})
    
  }

  const handleRemoveTodo = (id) => {    
    dispatch({type: "unblock_todo", payload: { id: id }})
    dispatch({type: "delete_todo", payload: { id: id }})
  }
  
  const handleSavedStorageTodo = (id) => {
    dispatch({type: "block_todo", payload: { id: id }})         
  }

  const handleDeleteStorageTodo = (id) => {    
    dispatch({type: "unblock_todo", payload: { id: id }})
  }

  const handleEditTodo = (title, id) => {
    dispatch({type: "edit_todo", payload: { id: id, title: title }})
  }


  return (
    <section className='todoapp'>
      <header className='header'>        
        <h1>todos</h1> 
        <FormAddTodo createTodo={handleAddTodo}/>     
      </header>
      {
        state.length > 0 
        ? <TodoList 
            todos={state} 
            removeTodos={handleRemoveTodo} 
            lockTodo={handleSavedStorageTodo} 
            unLockTodo={handleDeleteStorageTodo}
            editTodo={handleEditTodo}
          /> 
        : <p>No hay tareas, añadir tareas</p>
      }
      <Footer todoItems={state.length}/>      
    </section>
  )
}

export default App
