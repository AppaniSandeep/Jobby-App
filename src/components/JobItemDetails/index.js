import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import Skills from '../Skills'

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
  })

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {similarJobsData, jobDetails, skills, lifeAtCompany} = this.state
    console.log(skills)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <div>
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p>{jobDescription}</p>
        <div>
          <h1>Skills</h1>
          <ul>
            {skills.map(eachItem => (
              <Skills key={eachItem.name} skillDetails={eachItem} />
            ))}
          </ul>
        </div>
        <div>
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
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
      <>
        <Header />
        <div>{this.renderJobItemDetailsPageView()}</div>
      </>
    )
  }
}
export default JobItemDetails
