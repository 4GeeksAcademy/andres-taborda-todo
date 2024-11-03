import { useState } from "react"
import { baseUrl } from "../const";

export const useFetchUser = () => {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  

  const createUser = async ( userName ) => {
    setIsLoading(true)
    try {
      const response =  await fetch(`${baseUrl}/users/${userName}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        } 
      })
      const data =  await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail);
      }
      
      setUserName(data)   
    } catch (error) {
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    }    
  }

  const getUsers = async ( username ) => {
    try {
      const response = await fetch(`${baseUrl}/users/`) 
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail);
      }
      
      const user = data.users.find(user => user.name === username)

      if (!user) {
        createUser(username)
        return
      }
      setUserName(user)

    } catch (error) {
      setIsError(error.message)     
    } finally{
      setIsLoading(false)
    } 
  }

  return { userName, isLoading, error, getUsers }
}
