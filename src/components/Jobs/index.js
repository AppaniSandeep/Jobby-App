import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import ProfileSection from '../ProfileSection'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  noJobs: 'NO Jobs',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    searchInputText: '',
    searchInput: '',
    employmentTypes: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypes, activeSalaryRangeId, searchInput} = this.state
    console.log(activeSalaryRangeId)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join(
      ',',
    )}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response.status)
    if (response.ok === true) {
      const fetchedData = await response.json()
      if (fetchedData.jobs.length === 0) {
        this.setState({apiStatus: apiStatusConstants.noJobs})
        return
      }
      console.log(fetchedData.jobs.length)
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobCardView = () => {
    const {jobsData} = this.state
    return (
      <div className="jobs-view-container">
        <ul className="jobs-view-list">
          {jobsData.map(eachItem => (
            <JobCard key={eachItem.id} jobCardDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobCardFailureView = () => (
    <div className="jobs-failure-view-bg-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        data-testid="Retry"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        className="no-jobs-image"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobCardView()
      case apiStatusConstants.failure:
        return this.renderJobCardFailureView()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInputText: event.target.value})
  }

  changeEmploymentType = activeEmploymentTypeId => {
    this.setState(prevState => {
      const {employmentTypes} = prevState
      let updatedEmploymentTypes
      if (employmentTypes.includes(activeEmploymentTypeId)) {
        updatedEmploymentTypes = employmentTypes.filter(
          id => id !== activeEmploymentTypeId,
        )
      } else {
        updatedEmploymentTypes = [...employmentTypes, activeEmploymentTypeId]
      }
      return {employmentTypes: updatedEmploymentTypes}
    }, this.getJobsData)
  }

  changeInput = () => {
    const {searchInputText} = this.state
    this.setState({searchInput: searchInputText}, this.getJobsData)
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsData)
    console.log(activeSalaryRangeId)
  }

  render() {
    const {searchInputText, employmentTypes, activeSalaryRangeId} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="body-container-desktop-view">
          <div className="jobs-sub-container1">
            <ProfileSection />
            <hr className="line" />
            <div>
              <FiltersGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeEmploymentType={this.changeEmploymentType}
                changeSalaryRange={this.changeSalaryRange}
                activeEmploymentTypeIds={employmentTypes}
                activeSalaryRangeId={activeSalaryRangeId}
              />
            </div>
          </div>
          <div className="jobs-sub-container2">
            <div className="search-input-button-card">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInputText}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.changeInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderJobsView()}</div>
          </div>
        </div>
        <div className="body-container-mobile-view">
          <div className="search-input-button-card">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInputText}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.changeInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobs-sub-container1">
            <ProfileSection />
            <hr className="line" />
            <div>
              <FiltersGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeEmploymentType={this.changeEmploymentType}
                changeSalaryRange={this.changeSalaryRange}
                activeEmploymentTypeIds={employmentTypes}
                activeSalaryRangeId={activeSalaryRangeId}
              />
            </div>
          </div>
          <div className="jobs-sub-container2">
            <div>{this.renderJobsView()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
