import PropTypes from 'prop-types';
import { useState } from 'react';

export const Todo = ({ id, title, isSaved, removeTodos, lockTodo, unLockTodo, editTodo}) => {
  const [isEditing, setisEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title)

  const handleEdit = () => {
    setisEditing(true)
  }

  const handleSubmit = (event) => {
    event.target.value
    editTodo(inputValue, id)
    setisEditing(false)
  }

  return (
    <div>
      {
        !isEditing 
        ? <>
            <label>{title}</label>
            <button type="button" onClick={!isSaved ? () => lockTodo(id) : () => unLockTodo(id) } className="block">
              {
                !isSaved ? <i className="fas fa-lock-open m-2"></i> : <i className="fas fa-lock"></i>
              }                
            </button>
            <button type="button" onClick={() => handleEdit(id)} className="edit">
              <i className="fas fa-edit"></i>
            </button>
            <button type="button" onClick={() => removeTodos(id)} className="destroy">
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        : <form onSubmit={handleSubmit}>
            <input
              defaultValue={title}
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
  id: PropTypes.string,
  title: PropTypes.string,
  removeTodos: PropTypes.func,
  lockTodo: PropTypes.func,
  unLockTodo: PropTypes.func,
  editTodo: PropTypes.func,
  isSaved: PropTypes.bool

}

