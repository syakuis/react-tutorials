import React, { Component } from 'react';

class Datetimepicker extends Component {

	constructor(props) {
		super(props);
	}

	state = { options : {
		format: 'YYYY/MM/DD HH:mm:ss',
		locale: moment().locale('ko')
	}, ...this.props.options};

	handleClick() {
		console.log('자식 함수 호출됨.');
	}

	componentDidMount() {
		const datetimepicker = this.refs.datetimepicker;
		let $datetimepicker = $('[data-jquery="datetimepicker"]', datetimepicker);

		$datetimepicker.datetimepicker(this.state.options);
	}

	render() {
		let { children, options, ...props } = this.props;

		return (
			<div ref="datetimepicker" {...props}>
				{children}
			</div>
		)
	}

}

export default Datetimepicker;
