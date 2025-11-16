import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <h1 className="home-main-heading">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary <br />
            information,company reviews.Find the job that fits your
            <br />
            abilities and potential.
          </p>
          <Link className="link" to="/jobs">
            <button className="find-jobs-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
