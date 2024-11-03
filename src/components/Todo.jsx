import PropTypes from 'prop-types';
import { useState } from 'react';

export const Todo = ({ todo, removeTodos, lockTodo, unLockTodo, editTodo}) => {
  const { label, id, isSaved } = todo
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(label)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    editTodo(inputValue, todo)
    setIsEditing(false)
  }

  return (
    <div>
      {
        
        !isEditing 
        ? <>
            <label>{label}</label>
            <button type="button" onClick={!isSaved ? () => lockTodo(label) : () => unLockTodo(id) } className="block">
              {
                !isSaved ? <i className="fas fa-lock-open m-2"></i> : <i className="fas fa-lock"></i>
              }                
            </button>
            <button type="button" onClick={() => handleEdit(id)} className="edit">
              <i className="fas fa-edit"></i>
            </button>
            <button type="button" onClick={() => removeTodos(todo)} className="destroy">
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        : <form onSubmit={handleSubmit}>
            <input
              defaultValue={label}
              onChange={(event) => { setInputValue(event.target.value)  }}
              autoFocus
              type="text"
              className="new-todo"
            />
          </form>
      }
      
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.object,
  removeTodos: PropTypes.func,
  lockTodo: PropTypes.func,
  unLockTodo: PropTypes.func,
  editTodo: PropTypes.func,
}

