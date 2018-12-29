import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import { formatDate } from '../../../helpers/date'
import { Button } from 'reactstrap'
import { getFeeds } from '../actions/newsAction'
import { deleteFeed, getANews } from '../actions/aNewAction'
import * as FontAwesome from 'react-icons/fa'


class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetched: false
    }
  }
  componentDidMount() {
    const { getANews, match } = this.props

    getANews(match.params.id, () => {
      this.setState({
        fetched: true
      })
    })
  }
  isAuthor = creator => {
    const { isAuth, user } = this.props
    if (isAuth && user.user.user.givenName === creator.split(' ')[0]) return true
    return false
  }
  deleteFeed = () => {
    const id = this.props.new._id
    const token = this.props.user.user.token
    this.props.deleteFeed(id, token, () => {
      this.props.getFeeds(() => {
        this.props.history.push('/news')
      })
    })
  }
  render() {
    const article = () => {
      const { feed } = this.props.new
      return (
        <div className="article">
          <h1>{feed.title}</h1>
          <span>{feed.creator.displayName} | Created {formatDate(feed.createDate)}</span>
          <p>{feed.content}</p>
          <div className="controls">
            {
              this.isAuthor(feed.creator.displayName)
              &&
              <div>
                <Button color="warning">
                  <Link to={`/news/${feed._id}/edit`}>
                    <FontAwesome.FaEdit /> Edit
									</Link>
                </Button>
                <Button color="danger" onClick={this.deleteFeed}>
                  <FontAwesome.FaTrash /> Delete
								</Button>
              </div>
            }

          </div>
        </div>
      )
    }

    return (
      <div>
        {this.state.fetched ? article() : <Alert color="warning">Loading...</Alert>}
      </div>
    )
  }
}

Article.propTypes = {
  deleteFeed: PropTypes.func,
  getANews: PropTypes.func,
  getFeeds: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  new: state.news.new,
  user: state.user,
  isAuth: state.user.isAuth
})

const mapDispatchToProps = dispatch => ({
  getANews: (id, cb) => dispatch(getANews(id, cb)),
  deleteFeed: (id, token, cb) => dispatch(deleteFeed(id, token, cb)),
  getFeeds: (cb) => dispatch(getFeeds(cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)