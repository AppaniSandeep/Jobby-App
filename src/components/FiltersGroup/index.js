import './index.css'

const FiltersGroup = props => {
  const renderTypeOfEmploymentFilterList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employmentType => {
      const {changeEmploymentType, activeEmploymentTypeIds} = props
      const onChangeEmplomentTypeItem = event =>
        changeEmploymentType(event.target.value)
      const inputId = `employment-${employmentType.employmentTypeId}`
      const isChecked = activeEmploymentTypeIds.includes(
        employmentType.employmentTypeId,
      )
      return (
        <li className="filter-item" key={employmentType.employmentTypeId}>
          <input
            type="checkbox"
            id={inputId}
            onChange={onChangeEmplomentTypeItem}
            value={employmentType.employmentTypeId}
            checked={isChecked}
            className="checkbox"
          />
          <label htmlFor={inputId} className="label">
            {employmentType.label}
          </label>
        </li>
      )
    })
  }
  const renderTypeOfEmploymentFilters = () => (
    <div className="filter-card">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">{renderTypeOfEmploymentFilterList()}</ul>
    </div>
  )

  const renderSalaryRangeFilterList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryRange => {
      const {changeSalaryRange, activeSalaryRangeId} = props
      const onChnageSalaryRangeItem = event =>
        changeSalaryRange(event.target.value)
      const inputId = `salaryRange-${salaryRange.salaryRangeId}`
      const isChecked = activeSalaryRangeId === salaryRange.salaryRangeId
      return (
        <li className="filter-item" key={salaryRange.salaryRangeId}>
          <input
            type="radio"
            id={inputId}
            onChange={onChnageSalaryRangeItem}
            value={salaryRange.salaryRangeId}
            name="salary"
            checked={isChecked}
            className="radio"
          />
          <label htmlFor={inputId} className="label">
            {salaryRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilter = () => (
    <div className="filter-card">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">{renderSalaryRangeFilterList()}</ul>
    </div>
  )
  return (
    <div className="filter-container">
      {renderTypeOfEmploymentFilters()}
      <hr className="line" />
      {renderSalaryRangeFilter()}
    </div>
  )
}
export default FiltersGroup
