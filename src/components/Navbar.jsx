import PropTypes from "prop-types"
import '../styles/Navbar.css'

export const Navbar = ({username, leaveOut}) => {

  
  
  return (
    <nav>
      <span>What do you want to do?, {username}!</span>
      <button type="button" onClick={() => leaveOut()}>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </nav>
  )
}

Navbar.propTypes = {
  username: PropTypes.string,
  leaveOut: PropTypes.func
}