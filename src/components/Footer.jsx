
export const Footer = ({ todoItems }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoItems} items left</span>
    </footer>
  )
}
