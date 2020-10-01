import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import logo from '../assets/logo.png'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <img src={logo} alt="Rocket Stars"/>
        <div className="card #ffffff white">
          <div className="card-content">
            <span className="card-title">Authorization in RS apps</span>
            <div>


              <div className="input-field">
                <input
                  placeholder="Email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn #880e4f pink darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="btn black-text #e8eaf6 indigo lighten-5 marginTop"
              onClick={registerHandler}
              disabled={loading}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage
