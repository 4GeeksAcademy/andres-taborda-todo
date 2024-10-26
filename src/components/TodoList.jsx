import { Todo } from "./Todo"


export const TodoList = ({ todos, removeTodos }) => {
  return (
    <ul className="todo-list">
      {
        todos.map(({id, title}) => (
          <li key={id}>
            <Todo title={title} removeTodos={removeTodos} id={id}/>
          </li>
        ))
      }
    </ul>
  )
}

