import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'
import {receiveMessageOnPort} from 'worker_threads'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class GithubPopularRepos extends Component {
  state = {
    activeOptionId: languageFiltersData[0].id,
    ReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        ReposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLanguage = id => {
    this.setState({activeOptionId: id}, this.getRepos)
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRepositoryItem = () => {
    const {ReposList} = this.state
    return (
      <ul className="repo-container">
        {ReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="text">Something Went Wrong</h1>
    </>
  )

  renderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        this.renderRepositoryItem()

        break
      case apiStatusConstants.failure:
        this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        this.renderLoader()
        break

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <div className="languages-container">
          <ul className="list-container">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                languageDetails={eachLanguage}
                key={eachLanguage.id}
                onClickingLanguage={this.onClickLanguage}
              />
            ))}
          </ul>
        </div>
        {this.renderStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
