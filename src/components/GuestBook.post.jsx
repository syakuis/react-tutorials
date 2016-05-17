import React, { Component } from 'react';

class GuestBookPost extends Component {

	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(event) {
		if (event.keyCode !== 13) return;
		event.preventDefault();
		this.props.onClickPostAdd();
	}

	render() {

		let display = (
			<div>
				<p></p>
				<div className="alert alert-success">
					{this.props.memo} ({this.props.memo.length} 글자수)
				</div>
			</div>
		);

		return (
			<div>
					<div className="input-group">
						<input type="text" className="form-control" placeholder="내용을 입력하세요."
							onChange={this.props.onChangePost}
							onKeyDown={this.handleKeyDown}
							autoFocus={true}
							value={this.props.memo} />
						<span className="input-group-btn">
							<button className="btn btn-success" type="button" onClick={this.props.onClickPostAdd}>등록</button>
						</span>
					</div>
				{display}
			</div>
		);
	}
}

export default GuestBookPost;
