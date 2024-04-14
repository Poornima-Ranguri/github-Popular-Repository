import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    id,
    issuesCount,
    name,
    starsCount,
  } = repositoryDetails

  return (
    <li key={id} className="item-container">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="heading-item">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-image"
        />
        <p className="star-text">{starsCount}stars</p>
      </div>

      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-image"
        />
        <p className="star-text">{forksCount} forks</p>
      </div>

      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-image"
        />
        <p className="star-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
