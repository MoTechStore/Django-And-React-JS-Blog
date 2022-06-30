import React from 'react'
import {useCookies} from 'react-cookie';


function NavBar() {

  const [token, SetToken, removeToken] = useCookies(['mytoken'])

  const logoutBtn = () => {
    removeToken(['mytoken'])

  }

    return (
        <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Learn Python Blog</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" onClick={logoutBtn}>Log out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</div>
    )
}

export default NavBar
