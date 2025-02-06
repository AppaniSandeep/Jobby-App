const SimilarJobItem = props => {
  const {similarJobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItemDetails

  return (
    <li>
      <div className="similar-bg-container">
        <div>
          <img src={companyLogoUrl} alt="similar job company logo" />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
        <div>
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
