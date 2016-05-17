import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GuestBookPost from '../components/GuestBook.post.jsx'
import GuestBookList from '../components/GuestBook.list.jsx'

import * as GuestBookAction from '../actions/guestbook.action'

class GuestBook extends Component {

	constructor(props) {
		super(props)
	}

	handleClickPostAdd(memo) {
		this.props.actions.add(memo);
	}

	handleClickPostUpdate(id, memo) {
		this.props.actions.update(id, memo);
	}

	handleClickPostDelete(id) {
		this.props.actions.del(id);
	}

	render() {

		return (
			<div className="container">
					<h1>Guest Book ({this.props.guestbook.length})</h1>
					<GuestBookPost onClickPostAdd={this.handleClickPostAdd.bind(this)} />
					<hr />

					<GuestBookList
						onClickPostDelete={this.handleClickPostDelete.bind(this)}
						onClickPostUpdate={this.handleClickPostUpdate.bind(this)}
						data={this.props.guestbook} />
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		guestbook: state.guestbook
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	  actions: bindActionCreators(GuestBookAction, dispatch)
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestBook)
