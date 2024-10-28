import PropTypes from 'prop-types';

export const Todo = ({ id, title, removeTodos }) => {
  return (
    <div>
      <label>{title}</label>
      <button type="button" onClick={() => removeTodos(id)} className="destroy">
      </button>
    </div>
  )
}

Todo.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  removeTodos: PropTypes.func

}

