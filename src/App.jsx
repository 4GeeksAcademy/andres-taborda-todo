import { useEffect, useReducer, useState } from 'react';


import './styles/App.css';
import { Footer } from './components/Footer';
import { FormAddTodo } from './components/FormAddTodo';
import { TodoList } from './components/TodoList';
import { todoReducer } from './reducers/todosReducer';
import { useFetchTodo } from './hooks/useFetchTodo';
import { Auth } from './pages/auth/auth';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState({ username: "", isLogin : false });
  const [state, dispatch] = useReducer(todoReducer,[])
  const { todos, isLoading, error, getUserTodos, saveTodo, deleteTodo, updateTodo } = useFetchTodo()
  
  
  const handleAddTodo = (title) => {
    dispatch({type: "add_todo", payload: { title: title }})
    
  }

  const handleRemoveTodo = (todo) => {    
    dispatch({type: "unblock_todo", payload: { id: todo.id }})
    dispatch({type: "delete_todo", payload: { id: todo.id }})
    if (todo.isSaved) {
      deleteTodo(todo.id)      
    }
  }
  
  const handleSavedStorageTodo = (title) => {
    saveTodo(isAuthenticated.username, title)
    if (!error) {      
      dispatch({type: "block_todo", payload: { label: title }})         
    }
    
  }

  const handleDeleteStorageTodo = (id) => {
    deleteTodo(Number(id))   
    if (!error) {
      dispatch({type: "unblock_todo", payload: { id: id }})
    }
  }

  const handleEditTodo = (title, todo) => {
    
    dispatch({type: "edit_todo", payload: { id: todo.id, title: title }})
    console.log(todo.isSaved);
    
    if (todo.isSaved) {
      updateTodo(todo.id, title)      
    }
    
  }

  const handleLeave = () => {
    localStorage.removeItem("user")
    setIsAuthenticated({ username: "", isLogin : false })
  }

  useEffect(() => {        
    const user = JSON.parse(localStorage.getItem("user"))
    
    if (user) {
      
      setIsAuthenticated(() => {
        getUserTodos(user)
        return {username: user, isLogin: true}
      })
      
    }
  }, [isAuthenticated.isLogin]);

  useEffect(() => {    
    if (todos.length > 0) {
      dispatch({type: "update_todos", payload:{todos: todos}})
    }    
  }, [todos]);

  return (
    isAuthenticated.isLogin 
  ? <>
      <Navbar username={isAuthenticated.username} leaveOut={handleLeave}/>
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
          : (
              <>
                <p>No hay tareas, añadir tareas</p>
                {isLoading && <Loader/>}
              </>

            )
        }
        <Footer todoItems={state.length}/> 
        {error && <p>{error}</p> }   
      </section>
    </>
  : <Auth login={setIsAuthenticated}/>
  )
}

export default App
