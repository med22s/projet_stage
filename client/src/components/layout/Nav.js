import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div className="navbar bg-success">
            <h5>
                <Link to='/'>Noussam Logger</Link>
            </h5>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    )
}

export default Nav
