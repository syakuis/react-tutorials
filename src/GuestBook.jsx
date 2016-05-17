import React from 'react';
import ReactDOM from 'react-dom';

class GuestBook {
	static main() {

		let GuestBook = React.createClass({

			getInitialState() {
				return {
					memo: '',
					data: []
				};
			},

			handleChange(event) {
				this.setState({ memo: event.target.value });
			},

			handleKeyDown(event) {
				if (event.keyCode !== 13) return;
				event.preventDefault();
				this.handleClick();
			},

			handleClick(event) {
				let data = this.state.data;
				let memo = this.state.memo;

				if (memo === '' || memo === null || memo === undefined) return;

				this.setState({
					memo: '',
					data: [ memo, ...data ]
				});
			},

			deleteItemOne(key) {
				let data = this.state.data;
				data.splice(key, 1);

				this.setState({
					memo: '',
					data: data
				});
			},

			render() {

				let items = this.state.data.map((v, i) => {
						return(
							<li className="list-group-item" key={i}>
								<button type="button" className="close" onClick={() => this.deleteItemOne(i)}><span>&times;</span></button>
								<i className="fa fa-comments" aria-hidden="true"></i> {v}
							</li>
						);
				});

				let display = (
					<div>
						<p></p>
						<div className="alert alert-success">
							{this.state.memo} ({this.state.memo.length})
						</div>
					</div>
				);

				return (
					<div className="container">
						<h1>Guest Book</h1>
						<form>
							<div className="input-group">
								<input type="text" className="form-control" placeholder="내용을 입력하세요."
									onChange={this.handleChange}
									onKeyDown={this.handleKeyDown}
									autoFocus={true}
									value={this.state.memo} />
								<span className="input-group-btn">
									<button className="btn btn-success" type="button" onClick={this.handleClick}>등록</button>
								</span>
							</div>
						</form>

						{display}

						<hr />

						<ul className="list-group">
							{items}
						</ul>
					</div>
				);
			}

		});

		ReactDOM.render(
			<GuestBook />,
			document.getElementById('app')
		)
	}
}

GuestBook.main();
