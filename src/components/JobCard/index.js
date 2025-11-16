import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {MdLocalPostOffice} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails
  return (
    <li className="job-card-item">
      <Link to={`/jobs/${id}`} className="link">
        <div className="jobcard-bg-container">
          <div className="profile-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-card">
              <h1 className="title">{title}</h1>
              <p className="rating">
                <FaStar className="star-icon" /> {rating}
              </p>
            </div>
          </div>
          <div className="employment-details-container">
            <div className="location-employmenttype-card">
              <p className="location">
                <FaMapMarkerAlt /> {location}
              </p>
              <p className="employmenttype">
                <MdLocalPostOffice /> {employmentType}
              </p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="job-description-container">
            <h1 className="description-heading">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
