const Skills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li>
      <div>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}
export default Skills
