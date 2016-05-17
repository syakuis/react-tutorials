import React from 'react';
import ReactDOM from 'react-dom';
import Datetimepicker from './components/Datetimepicker.jsx';
import GuestBookPost from './components/GuestBook.post.jsx';
import GuestBookList from './components/GuestBook.list.jsx';

class GuestBook {
	static main() {

		let GuestBook = React.createClass({

			getInitialState() {
				return {
					memo: '',
					data: []
				};
			},

			setData(data) {
				return {
					id: this.state.data.length - 1,
					...data
				};
			},

			storeMemoUpdate(memo) {
				this.setState({ memo: memo });
			},

			storeDataAdd() {
				let data = this.state.data;
				let memo = this.setData({ memo: this.state.memo });

				this.setState({
					memo: '',
					data: [ memo, ...data ]
				});
			},

			storeDataUpdate(data, up) {
				let datas = this.state.data.map(candidate => {
					return candidate !== data ? candidate : up;
				});

				this.setState({ data: datas });
			},

			storeDataDelete(index) {
				let data = this.state.data;
				data.splice(index, 1);

				this.setState({ data: data });
			},

			handleChangePost(event) {
				this.storeMemoUpdate(event.target.value);
			},

			handleClickPostAdd(event) {
				let memo = this.state.memo;
				if (memo === '' || memo === null || memo === undefined) return;
				this.storeDataAdd();
			},

			handleClickPostUpdate(data, up) {
				this.storeDataUpdate(data, up);
			},

			handleClickPostDelete(index) {
				this.storeDataDelete(index);
			},

			handleClick() {
				console.log('부모 이벤트 클릭!!');
				this.refs.datetimepicker.handleClick();
			},

			render() {

				return (
					<div className="container">
						<h1>Guest Book ({this.state.data.length})</h1>
						<GuestBookPost
							onClickPostAdd={this.handleClickPostAdd}
							onChangePost={this.handleChangePost}
							memo={this.state.memo} />

						<hr />

						<Datetimepicker ref="datetimepicker">
								<div className='input-group date' data-jquery='datetimepicker'>
									<input type='text' className="form-control"/>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
								<div className="text-right" style={{ marginTop: 10, marginBooton: 10 }}>
									<button className="btn btn-default" type="button" onClick={this.handleClick}>자식호출</button>
								</div>
						</Datetimepicker>

						<GuestBookList
							onClickPostDelete={this.handleClickPostDelete}
							onClickPostUpdate={this.handleClickPostUpdate}
							data={this.state.data} />
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
