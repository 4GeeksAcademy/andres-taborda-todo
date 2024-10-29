

export const localStorageReducer = (state, action) => {
  const listTodos = [...action.todos]
  const todoToSaved = listTodos.find(todo => todo.id === action.id)

  const updateStorage = ( listTodos ) => {
    localStorage.setItem("todos", JSON.stringify(
      listTodos.filter(todo => todo.isSaved === true)
    ))
    return listTodos
  }

  switch (action.type) {
    case "save_todo":
      {        
        if (todoToSaved) {
          todoToSaved.isSaved = true                     
          state = updateStorage( listTodos )
          return state 
        }
        return state
      }
    case "remove_todo":
      {        
        if (todoToSaved) {
          todoToSaved.isSaved = false                     
          state = updateStorage( listTodos )
          return state 
        }
        return state
      }
    
    default:
      break;
  }
}