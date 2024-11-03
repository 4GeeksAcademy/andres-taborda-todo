import { useState } from "react";
import { baseUrl } from "../const";



export const useFetchTodo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  

  const getUserTodos =  async ( userName ) => {
    setIsLoading(true)
    try {
      const response =  await fetch(`${baseUrl}/users/${userName}`)
      const data =  await response.json()

      if (!response.ok) {
        throw new Error(data.detail);
      }
      const listTodos = data.todos.map(todo => ({...todo,isSaved: true, id: String(todo.id) }))  
      setTodos(listTodos)   
    } catch (error) {
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    }
  }

  const saveTodo = async ( userName, title ) => {
    setIsLoading(true)
    try {
      
      const response =  await fetch(`${baseUrl}/todos/${userName}`, {
        method: 'POST',
        body:JSON.stringify({
          "label": title,
          "is_done": false
        }),
        headers: {
          "Content-Type": "application/json",
        } 
      })
      const data =  await response.json()

      if (!response.ok) {
        throw new Error(data.detail);
      }
      
      setTodos(prev => [...prev, {...data, id: String(data.id), isSaved: true}])
    } catch (error) {
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    }
  }

  const deleteTodo = async ( todoId ) => {
    setIsLoading(true)
    
    try {
      const response =  await fetch(`${baseUrl}/todos/${todoId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data =  await response.json()
        throw new Error(data.detail);
      }
       
    } catch (error) {
      console.log(error);
      
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    }
  }

  const updateTodo = async ( id, newTitle ) => {
    
    try {
      const response =  await fetch(`${baseUrl}/todos/${id}`, {
        method: 'PUT',
        body:JSON.stringify({
          "label": newTitle
        }),
        headers: {
          "Content-Type": "application/json",
        } 
      })
      
      const data =  await response.json()
      

      if (!response.ok) {
        throw new Error(data.detail);
      }
        
    } catch (error) {
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    }
  }
  
  return { todos, isLoading, error, getUserTodos, saveTodo, deleteTodo, updateTodo }
}
