
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const showSwal = (message) => {
  withReactContent(Swal).fire({
    icon: "error",
    title: `<i>Something wrong!</i>`,
    text: message
    
  })
}

const updateStorage = ( listTodos ) => {

  localStorage.setItem("todos", JSON.stringify(
    listTodos.filter(todo => todo.isSaved === true)
  ))
  return listTodos
}


export const todoReducer = (state, action) => { 
  console.log("copia");
  
  const listTodos = [...state]

  switch (action.type) {
    case "add_todo":
      {
        const wasAdded = listTodos.filter(task => task.title.toUpperCase() === action.payload.title.toUpperCase())

        if (wasAdded.length > 0) {
          showSwal("Task already exists")
          return state
        }
        const newTodo = {
          id: uuidv4(),
          title: action.payload.title,
          isSaved: false
        }
        return [...state, newTodo]
      }

    case "edit_todo":
      {
        if (action.payload.title.trim().length < 2) {
          console.log("Task name is required");
          
          showSwal("Task name is required")
          return state
        }
        const updatesTodo = listTodos.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title}: todo)
        updateStorage(updatesTodo)
        return updatesTodo
      }
    case "delete_todo":
      {
        const updateTodoList = state.filter(todo => todo.id !== action.payload.id)
        return updateTodoList
      }
    case "block_todo":
      {       
        
        const todoToSaved = listTodos.find(todo => todo.id === action.payload.id)
        if (todoToSaved) {
          todoToSaved.isSaved = true                     
          updateStorage( listTodos )
          return listTodos 
        }
        return state
      }
    case "unblock_todo":
      {       
        const todoToSaved = listTodos.find(todo => todo.id === action.payload.id)
        if (todoToSaved) {
          todoToSaved.isSaved = false                     
          updateStorage( listTodos )
          return listTodos 
        }
        return state
      }
    
    default:
      throw Error('Unknown action: ' + action.type);
    
  }
}