import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {MdLocalPostOffice} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-bg-container">
      <ul className="nav-list-desktop">
        <Link to="/">
          <li>
            <img
              className="header-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>
        <li>
          <div className="nav-items-container">
            <Link className="link" to="/">
              <p>Home</p>
            </Link>
            <Link className="link" to="/jobs">
              <p>Jobs</p>
            </Link>
          </div>
        </li>
        <li>
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
      <ul className="nav-list-mobile">
        <li>
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
        <li>
          <ul className="home-jobs-logout-btn-container-list">
            <Link className="link" to="/">
              <li>
                <IoMdHome className="home-icon" />
              </li>
            </Link>
            <Link className="link" to="/jobs">
              <li>
                <MdLocalPostOffice className="bag-icon" />
              </li>
            </Link>
            <li>
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-btn-mobile"
              >
                <FiLogOut className="logout-icon" />
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
