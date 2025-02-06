const FiltersGroup = props => {
  const renderTypeOfEmploymentFilterList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employmentType => {
      const {changeEmploymentType} = props
      const onClickEmploymentTypeItem = () =>
        changeEmploymentType(employmentType.employmentTypeId)
      return (
        <li
          key={employmentType.employmentTypeId}
          onClick={onClickEmploymentTypeItem}
        >
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">{employmentType.label}</label>
        </li>
      )
    })
  }
  const renderTypeOfEmploymentFilters = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>{renderTypeOfEmploymentFilterList()}</ul>
    </div>
  )

  const renderSalaryRangeFilterList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryRange => {
      const {changeSalaryRange} = props
      const onClickChangeSalaryRangeItem = () =>
        changeSalaryRange(salaryRange.salaryRangeId)
      return (
        <li
          key={salaryRange.salaryRangeId}
          onClick={onClickChangeSalaryRangeItem}
        >
          <input type="radio" id="range" />
          <label htmlFor="range">{salaryRange.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilter = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>{renderSalaryRangeFilterList()}</ul>
    </div>
  )
  return (
    <div>
      {renderTypeOfEmploymentFilters()}
      <hr />
      {renderSalaryRangeFilter()}
    </div>
  )
}
export default FiltersGroup
