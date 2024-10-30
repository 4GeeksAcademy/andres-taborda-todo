import { Todo } from "./Todo"
import PropTypes from 'prop-types';

export const TodoList = ({ todos, removeTodos, lockTodo, unLockTodo, editTodo }) => {
  return (
    <ul className="todo-list">
      {
        todos.map(({id, title, isSaved}) => (
          <li key={id}>
            <Todo 
              title={title} 
              removeTodos={removeTodos} 
              id={id} 
              isSaved={isSaved} 
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

