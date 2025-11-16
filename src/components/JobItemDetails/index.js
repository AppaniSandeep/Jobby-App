import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {MdLocalPostOffice} from 'react-icons/md'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import Skills from '../Skills'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    imageUrl: data.image_url,
    description: data.description,
    title: data.title,
  })

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(params)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedSimilarData = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
        id: eachItem.id,
      }))
      const updatedJobDetails = this.getFormattedData(data.job_details)
      const updatedSkills = data.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      const updatedLifeAtCompanyDetails = this.getFormattedData(
        data.job_details.life_at_company,
      )
      this.setState({
        similarJobsData: updatedSimilarData,
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompanyDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryGetJobDetails = () => {
    this.getJobDetailsData()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailureView = () => (
    <div className="fialure-bg-container">
      <img
        className="img-failure"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.retryGetJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {similarJobsData, jobDetails, skills, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-details-bg-container">
        <div className="top-container">
          <div className="job-profile-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div className="profile-title-rating-card">
              <h1 className="job-item-title">{title}</h1>
              <p className="job-details-rating">
                <FaStar className="star-icon" /> {rating}
              </p>
            </div>
          </div>
          <div className="job-details-card">
            <div className="location-emoployment-card">
              <FaMapMarkerAlt className="map-icon" />
              <p className="job-location">{location}</p>
              <MdLocalPostOffice className="job-type-icon" />
              <p className="job-type">{employmentType}</p>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-card">
            <h1 className="job-description">Description</h1>
            <a href={companyWebsiteUrl} className="hyper-link">
              Visit
            </a>
          </div>
          <p className="job-description-text">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachItem => (
                <Skills key={eachItem.name} skillDetails={eachItem} />
              ))}
            </ul>
          </div>
          <div className="about-container">
            <h1 className="about-heading">Life at Company</h1>
            <div className="description-image-card">
              <p className="job-description-text">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="about-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs">
          <h1 className="similar-jobs-main-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachItem => (
              <SimilarJobItem
                key={eachItem.id}
                similarJobItemDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobItemDetailsPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobItemDetailsPageView()}
      </div>
    )
  }
}
export default JobItemDetails
