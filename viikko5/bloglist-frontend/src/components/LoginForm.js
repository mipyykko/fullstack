import React from 'react'

const LoginForm = ({
  handleLogin, handleLoginFormChange, username, password
}) => (
  <div>

    <h2>Log in</h2>
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleLoginFormChange}
        />
      </div>
      <div>
          password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleLoginFormChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm