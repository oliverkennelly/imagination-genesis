import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Nav.css"

export const NavBar = ({currentUser}) => {
    const navigate = useNavigate()
    const usersName = currentUser.name

    return <ul className="navbar">
        <h3>Welcome {usersName}</h3>
        {localStorage.getItem("genesis_user") ? (
            <button className="navbar-item">
                <Link
                    to=""
                    onClick={() => {
                        localStorage.removeItem("genesis_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </button>
        ) : (
        ""
        )}
    </ul>
}