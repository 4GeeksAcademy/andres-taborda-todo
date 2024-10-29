import PropTypes from 'prop-types';

export const Todo = ({ id, title, isSaved, removeTodos, lockTodo, unLockTodo}) => {
  

  return (
    <div>
      <label>{title}</label>
      <button type="button" onClick={!isSaved ? () => lockTodo(id) : () => unLockTodo(id) } className="block">
        {
          !isSaved ? <i className="fas fa-lock-open m-2"></i> : <i className="fas fa-lock"></i>
        }                
      </button>
      {/* <button type="button" onClick={() => removeTodos(id)} className="destroy">
        edit
      </button> */}
      <button type="button" onClick={() => removeTodos(id)} className="destroy">
      </button>
    </div>
  )
}

Todo.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  removeTodos: PropTypes.func,
  lockTodo: PropTypes.func,
  unLockTodo: PropTypes.func,
  isSaved: PropTypes.bool

}

