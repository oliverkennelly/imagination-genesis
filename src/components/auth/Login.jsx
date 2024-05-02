import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"
import "./Login.css"

export const Login = () => {
  const [email, set] = useState("peskybird@hermitmail.com")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "genesis_user",
          JSON.stringify({
            id: user.id,
            name: user.name,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="background">
      <section className="container-login">
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="welcome">Welcome to Imagination Genesis</h1>
          <hr></hr>
          <h2 className="message">Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
