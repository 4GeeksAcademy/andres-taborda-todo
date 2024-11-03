import PropTypes from 'prop-types'
import './../../styles/Auth.css'
import { useEffect, useState } from 'react';
import { useFetchUser } from '../../hooks/useFetchUser';

export const Auth = ({ login }) => {
  const [inputValue, setInputValue] = useState("");
  const { userName, isLoading, error, getUsers } = useFetchUser()

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleClick = () => {
    getUsers(inputValue)
    
  }

  useEffect(() => {
    if (userName) {
      localStorage.setItem("user", JSON.stringify(userName.name))
      login(prev => ({...prev, username:userName, isLogin: true}))
    }  
    
  }, [login, userName]);

  return (
    <div className="subscribe">
      <h1>todo app</h1>
      <p>Welcome</p>
      <input 
        placeholder="Your username" 
        className="subscribe-input" 
        name="text" 
        type="text"
        onChange={handleChange}
      ></input>
      <button className="submit-btn" onClick={handleClick}>{isLoading ? 'Loading...' : 'Go!'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

Auth.propTypes = {
  login: PropTypes.func
}
