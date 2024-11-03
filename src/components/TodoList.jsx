import { Todo } from "./Todo"
import PropTypes from 'prop-types';

export const TodoList = ({ todos, removeTodos, lockTodo, unLockTodo, editTodo }) => {
  return (
    <ul className="todo-list">
      {
        todos.map((todo) => (
          <li key={todo.id}>
            <Todo 
              todo={todo} 
              removeTodos={removeTodos}  
              lockTodo={lockTodo} 
              unLockTodo={unLockTodo}
              editTodo={editTodo}
            />
          </li>
        ))
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  removeTodos: PropTypes.func,
  lockTodo: PropTypes.func,
  unLockTodo: PropTypes.func,
  editTodo: PropTypes.func
}

