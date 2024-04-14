import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickingLanguage} = props
  const {id, language} = languageDetails
  const onClicking = () => {
    onClickingLanguage(id)
  }
  return (
    <li className="item" key={id}>
      <button type="button" className="btn-element" onClick={onClicking}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
