import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skill-item">
      <div className="skill-item-card">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill">{name}</p>
      </div>
    </li>
  )
}
export default Skills
