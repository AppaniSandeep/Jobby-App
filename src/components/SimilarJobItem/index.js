import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {MdLocalPostOffice} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItemDetails

  return (
    <li className="similar-job-item">
      <div className="similar-job-container">
        <div className="similar-profile-card">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-company-logo"
          />
          <div className="similar-title-rating-card">
            <h1 className="similar-title">{title}</h1>
            <p className="similar-rating">
              <FaStar className="star-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="similar-description-card">
          <h1 className="similar-description-heading">Description</h1>
          <p className="similar-text-description">{jobDescription}</p>
        </div>
        <div className="similar-bottom-card">
          <p className="similar-location">
            <FaMapMarkerAlt className="map-icon" /> {location}
          </p>
          <p className="similar-employment">
            <MdLocalPostOffice className="job-type-icon" /> {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
