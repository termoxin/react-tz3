import React from 'react'
import PropTypes from 'prop-types'
import CardItem from './Card'

const NewsList = (props) => (
	<div className="container">
		<div className="row">
			{
				props.news.map(item => (
					<CardItem
						key={item._id} 
						id={item._id}
						title={item.title}
						creator={item.creator.displayName}
						date={item.createDate}
						text={item.content}
					/>
				))
			}
		</div>
	</div>
)

NewsList.propTypes = {
	news: PropTypes.array
}

export default NewsList