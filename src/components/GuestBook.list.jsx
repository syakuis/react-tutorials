import React, { Component } from 'react';

class GuestBookList extends Component {

	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		data: React.PropTypes.array
	}

	state = {
		target: -1,
		memo: '',
		data: null
	}

	handleKeyDown(event) {
		if (event.keyCode !== 13) return;
		event.preventDefault();
		this.handleClickPostUpdate();
	}

	handleChange(event) {
		this.setState({ memo: event.target.value });
	}

	handleDubleClick(index, data) {
		this.setState({ target: index, memo: data.memo, data: data });
	}

	handleClickPostUpdate() {
		let data = this.state.data;
		let up = { ...data, memo: this.state.memo };
		this.props.onClickPostUpdate(data, up);
		this.setState({target: -1, memo: ''});
	}

	render () {
		var target = this.state.target;

		let items = this.props.data.map((data, i) => {
				let item;

				if (target === i) {
					item = (
						<div className="input-group">
							<input type="text" className="form-control" placeholder="내용을 입력하세요."
								onKeyDown={this.handleKeyDown}
								onChange={this.handleChange}
								autoFocus={true}
								value={this.state.memo} />
							<span className="input-group-btn">
								<button className="btn btn-success" type="button" onClick={() => this.handleClickPostUpdate()}>수정</button>
							</span>
						</div>
					);
				} else {
					item = (
						<div>
							<button type="button" className="close" onClick={() => this.props.onClickPostDelete(i)}><span>&times;</span></button>
							<i className="fa fa-comments"></i> {data.memo}
						</div>
					);
				}

				return(
					<li className="list-group-item" key={i} onDoubleClick={() => this.handleDubleClick(i, data)}>
					{item}
					</li>
				);
		});

		return (
			<ul className="list-group">
				{items}
			</ul>
		);

	}
}

export default GuestBookList;
