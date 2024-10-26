import { useState } from "react"


export const FormAddTodo = ({createTodo}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createTodo(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(event) => { setInputValue(event.target.value) }}
        placeholder='Add new todo'
        autoFocus
        type="text"
        className="new-todo"
      />
    </form>
  )
}
