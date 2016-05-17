import React, { Component } from 'react';

class GuestBookPost extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	// 부모에서 하는 것이 아니라 입력된 값은 여기서 관리되어야 함.
	state = {
		// null은 사용할 수 없음.
		memo: ''
	}

	handleChange(event) {
		this.setState({ memo: event.target.value });
	}

	handleAdd() {
		this.props.onClickPostAdd(this.state.memo);
	}

	handleKeyDown(event) {
		if (event.keyCode !== 13) return;
		event.preventDefault();
		this.handleAdd();
	}

	render() {

		return (
			<div>
					<div className="input-group">
						<input type="text" className="form-control" placeholder="내용을 입력하세요."
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							autoFocus={true}
							value={this.state.memo} />
						<span className="input-group-btn">
							<button className="btn btn-success" type="button" onClick={this.handleAdd}>등록</button>
						</span>
					</div>
			</div>
		);
	}
}

export default GuestBookPost;
