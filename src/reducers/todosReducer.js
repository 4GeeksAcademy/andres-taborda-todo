
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const showSwal = () => {
  withReactContent(Swal).fire({
    icon: "error",
    title: `<i>Something wrong!</i>`,
    text: 'Task already exists'
    
  })
}

const updateStorage = ( listTodos ) => {

  localStorage.setItem("todos", JSON.stringify(
    listTodos.filter(todo => todo.isSaved === true)
  ))
  return listTodos
}


export const todoReducer = (state, action) => { 

  const listTodos = [...state]

  switch (action.type) {
    case "add_todo":
      {
        const wasAdded = listTodos.filter(task => task.title.toUpperCase() === action.payload.title.toUpperCase())

        if (wasAdded.length > 0) {
          showSwal()
          return state
        }
        const newTodo = {
          id: uuidv4(),
          title: action.payload.title,
          isSaved: false
        }
        return [...state, newTodo]
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