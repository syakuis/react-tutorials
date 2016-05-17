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
		id: -1,
		memo: ''
	}

	handleKeyDown(event) {
		if (event.keyCode !== 13) return;
		event.preventDefault();
		this.handleClickPostUpdate();
	}

	handleChange(event) {
		this.setState({ memo: event.target.value });
	}

	handleDubleClick(id, memo) {
		this.setState({ id: id, memo: memo });
	}

	handleClickPostUpdate() {
		this.props.onClickPostUpdate(this.state.id, this.state.memo);
		this.setState({id: -1, memo: ''});
	}

	handleClickPostDelete(id) {
		this.props.onClickPostDelete(id);
	}

	render () {
		var id = this.state.id;

		let items = this.props.data.map((data) => {
				let item;

				if (id === data.id) {
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
							<button type="button" className="close" onClick={() => this.handleClickPostDelete(data.id)}><span>&times;</span></button>
							<i className="fa fa-comments"></i> {data.memo}
						</div>
					);
				}

				return(
					<li className="list-group-item" key={data.id} onDoubleClick={() => this.handleDubleClick(data.id, data.memo)}>
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
