# React Tutorial #3 Guest Book Refactoring: 리액트 방명록 프로그램 리팩토링

### 개발환경

Mac OS X 10.11.14  
Node.js v0.12.7  
npm 2.11.3  
Atom 1.7.3  

React 15.0.1  
Babel 6.x.x

Blog Post: http://syaku.tistory.com/319  
GitHub Branch (프로그램 소스): https://github.com/syakuis/react-tutorial/tree/react-guestbook-refacktoring

## 관련 글

> 1. [React Tutorial #1 Install : 리액트 설치](http://syaku.tistory.com/317)
2. [React Tutorial #2 Guest Book : 리액트 방명록 만들기](http://syaku.tistory.com/318)
3. [React Tutorial #3 Guest Book Refactoring: 리액트 방명록 프로그램 리팩토링](http://syaku.tistory.com/319)
4. [React Tutorial #4 Guest Book Redux : 리액트 리듀스 방명록 프로그램](http://syaku.tistory.com/320)

### GuestBook 리팩토링

이번 세션에는 기존에 개발한 방명록 프로그램을 체계적으로 개선하는 과정을 설명하겠습니다. 

1. 컴포넌트를 세부적으로 분리합니다.
2. 데이터를 한쪽에서 관리할 수 있게 한곳에 함수를 둡니다.
3. JSX에서 jQuery 플러그인을 적용해 봅니다.
4. JSX에서 스타일시트를 사용해 봅니다.
5. 데이터 타입 및 유효성을 검사합니다.

원래 GuestBook.jsx 에서 모든 기능을 구현했지만 이것을 각 역활마다 세부적으로 분리하여 모듈화시켰습니다. 그러나 방명록을 분리하여 컴포넌트화 시킬 필요는 없습니다. 하지만 어떻게 세분화하여 컴포넌트를 재사용하는 지를 설명하기 위한 작업이라 이해하시면 되겠습니다. 만약 방명록에 사용되는 jQuery 플러그인 Bootstrap 3 Datepicker와 같은 날짜 선택 UI는 재사용성을 높이기 위해 컴포넌트화하는 것이 매우 효율적입니다.

방명록을 두가지 컴포넌트로 세분화하였고 한개의 컨트롤러로 두가지 컴포넌트를 활용할 수 있게 개발하였습니다. 저는 컴포넌트를 가지고 뷰에 전달하는 역활을 컨트롤러라고 표현하였습니다.

GuestBook.jsx : 컨트롤러  
GuestBook.post.jsx : 방명록 쓰기 컴포넌트  
GuestBook.list.jsx : 방명록 목록, 수정, 삭제 컴포넌트  

이렇게 구분하였습니다. 각 소스에서 중요한 부분만 설명하도록 하겠습니다.

**< / > GuestBook.post.jsx**

```js
import React, { Component } from 'react';

class GuestBookPost extends Component {
```
Component 키워드를 임포트하면 아래 extends에서 React.을 제외하고 코딩할 수 있습니다.

```js
	constructor(props) {
		super(props);
```
constructor는 class로 생성된 객체를 생성하고 초기화하기 위한 기본 메서드입니다. 상속한 Component에 props데이터는 넘겨주기 위해 super 키워드를 사용였고 super을 사용하면 부모 클래스(Component)의 constructor을 호출 할 수 있습니다.

```html
<GuestBookPost
			onClickPostAdd={this.handleClickPostAdd}
			onChangePost={this.handleChangePost}
			memo={this.state.memo} />
```
GuestBookPost 컴포넌트의 속성이 모두 constructor 매개변수(props)에 자동으로 들어오게 됩니다. 만약 ES6 문법을 사용하지 않았다면 이보다 코딩량이 더 많습니다. 부모에서 전달한 변수는 props변수로 받아야 합니다. 최종 데이터는 전달의 시작지점의 데이터가 업데이트 되어야 합니다. 당연히 state 변수여야 합니다.

ES6 Class 참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes


```js
this.handleKeyDown = this.handleKeyDown.bind(this);
```

이벤트를 얻기 위해 bind(this)를 사용해야 합니다. 클래스 인스턴스에 this를 자동으로 바인딩되지 않습니다.

**< / > GuestBook.list.jsx**

```js

	static propTypes = {
		data: React.PropTypes.array
	}

	state = {
		target: -1,
		memo: '',
		data: null
	}
```

클래스의 맴버변수를 사용하기 위해 stage-1 프리셋이 필요합니다. ES6+ 문법을 사용해서 프리셋이 필요합니다. ES6 문법은 다음과 같이 코딩하면 됩니다.

```js
class ... {
	constructor(props) {
		super(props);
		
		this.state = {
			....
		};
	}
}
```

두번째 방법의 문제는 propTypes를 사용할 수 없습니다. 제가 방법을 모를 수도.. 여튼 그렇습니다. 그래서 처음 설명한 ES6+ 문법으로 작성하는 게 좋습니다.

propTypes를 사용하여 데이터의 형식을 검증할 수 있습니다. 자세한 검증방법은 React Docs를 참고하세요. 그리고 컴포넌트에 자체 state 변수를 사용했습니다. 방명록을 수정할때 state 변수가 필요합니다. 변경된 데이터를 컨트롤러에 전달하여 최종 데이터를 업데이트합니다.

방명록 목록 컴포넌트는 목록을 출력하는 역활외에도 수정 및 삭제 기능을 가지고 있습니다. 그래서 state변수가 필요합니다.

```
handleDubleClick -> handleKeyDown OR handleClickPostUpdate -> this.props.onClickPostUpdate
```
수정은 떠블클릭 이벤트로 활성화 시킬 수 있습니다. 수정 대상은 state.target 변수 index 값이 업데이트되며 입력한 값이 변경되면 state.memo에 업데이트 됩니다. 엔터키나 수정버튼을 클릭하면 컨트롤러의 메서드를 호출하여 최종 데이터를 업데이트 합니다.

```js
	render () {
		var target = this.state.target;

		let items = this.props.data.map((data, i) => {
				let item;

				if (target === i) {
					item = (
						... 입력 ...
					);
				} else {
					item = (
						... 목록 ...
					);
				}

				...
				
		});
```

위 반복문은 목록을 출력하면서 state.target을 참조하여 i와 일치하면 입력항목을 변경하여 출력합니다. 목록을 떠블클릭하면 입력항목으로 변경되는 프로그래입니다.

**< / > GuestBook.jsx**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import GuestBookPost from './components/GuestBook.post.jsx';
import GuestBookList from './components/GuestBook.list.jsx';
```
import 키워드를 이용하여 컴포넌트를 가져옵니다. 확장자가 js인 경우 생략할 수 있습니다.

방명록 데이터를 한 곳에서 관리할 수 있게 메서드를 변경하였습니다. 각 메소드의 역활을 설명하게 습니다.

setData: 정해진 데이터를 입력받기 위해 방명록 등록전에 setData에서 가공된 데이터만 저장됩니다.  
storeMemoUpdate: input으로 입력된 memo 데이터를 업데이트합니다.  
storeDataAdd: 방명록을 등록합니다.  
storeDataUpdate: 방명록을 수정합니다.  
storeDataDelete: 방명록을 삭제합니다.  

방명록 데이터는 모두 위 메서드에 의해 관리되어야 하는 것이 기본 원칙입니다. 하지만 이렇게 개발할 경우 관련된 모든 컴포넌트에 해당 메서드를 사용할 수 있게 공유해야 하는 부담이 생깁니다. 그리고 데이터의 통일성이나 안정성을 보장받지 못할 수 도 있습니다. 그래서 Flux나 Redux를 사용하는 것이 좋습니다. 다음 세션에는 Flux를 설명할 계획입니다.

JSX에서 컴포넌트 속성 이벤트는 다음과 같이 연결됩니다.

```html
<GuestBookList
	onClickPostDelete={this.handleClickPostDelete}
	onClickPostUpdate={this.handleClickPostUpdate}
	data={this.state.data} />
```
GuestBookList 엘리먼트의 모든 속성은 props로 얻을 수 있습니다. 그래서 해당 이벤트를 호출하려면 this.props.onClickPostDelete 하고 호출된 이벤트는 부모 엘리먼트의 GuestBook.handleClickPostDelete 실행 됩니다.

JSX에서 스타일시트는 다음과 같이 사용합니다.

```js
style={{ marginTop: 10, marginBooton: 10 }}
```

`-` 제거하고 대문자를 사용합니다. margin-top => marginTop

마지막으로 JSX에서 jQuery 플러그인을 사용하는 방법을 설명하겠습니다.

JSX의 모든 태그는 HTML 태그가 아니라 React로 만들어진 컴포넌트입니다. 그래서 JSX에서 사용하는 div 태그는 HTML 태그가 아니라 React의 내장 컴포넌트입니다. JSX에서 사용하기 위해서는 컴포넌트화 시켜야 합니다. 예제로 사용할 jQuery 플러그인은 Bootstrap 3 Datepicker이며 이것을 컴포넌트화하여 React에서 사용할 수 있게하겠습니다.

jQuery와 jQuery 플러그인을 설치합니다.

```
$ bower install -S eonasdan-bootstrap-datetimepicker jquery moment
```
스크립트를 사용할 수 있게 호출합니다.

```html
<script src="./bower_components/jquery/dist/jquery.min.js"></script>
	<script src="./bower_components/moment/min/moment.min.js"></script>
	<script src="./bower_components/moment/min/moment-with-locales.min.js"></script>
	<script src="./bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
```

**< / > Datetimepicker.jsx**

```js
class Datetimepicker extends Component {
	
	// 옵션과 자식 엘리먼트를 얻습니다.
	constructor(props) {
		super(props);
	}

	// 기본 옵션과 사용자 옵션을 머지합니다.
	state = { options : {
		format: 'YYYY/MM/DD HH:mm:ss', // 날짜 기본 포맷을 설정합니다.
		locale: moment().locale('ko') // 달력 국제화 설정을 기본적으로 한국으로 합니다.
	}, ...this.props.options};

	// React에서 지원하는 메서드를 이용하여 가상 DOM이 만들어진 후에 구현체를 실행하게 합니다.
	componentDidMount() {
		// 가상DOM에서 아래의 엘리먼트를 찾습니다.
		const datetimepicker = this.refs.datetimepicker;
		let $datetimepicker = $('[data-jquery="datetimepicker"]', datetimepicker);

		$datetimepicker.datetimepicker(this.state.options);
	}

	render() {
		// 자식 엘리먼트를 children 변수에 넣습니다.
		let { children, options, ...props } = this.props;

		return (
			// 그외 속성이 있을 경우 자동으로 삽입될 수 있게 합니다.
			<div ref="datetimepicker" {...props}>
				// 자식 엘리먼트를 출력합니다.
				{children}
			</div>
		)
	}

}

```

만들어진 컴포넌트를 컨트롤러에서 호출합니다.

**< / > GuestBook.jsx**

```js
// 날짜선택 컴포넌트 호출
import Datetimepicker from './components/Datetimepicker.jsx';

class GuestBook {
	static main() {

		let GuestBook = React.createClass({

			...
			
			// 부모에서 자식 메서드를 호출할때
			handleClick() {
				console.log('부모 이벤트 클릭!!');
				this.refs.datetimepicker.handleClick();
			},

			render() {

				return (
						
						...
						
						<Datetimepicker ref="datetimepicker">
								// 입력항목을 UI를 직접 구현할 수 있습니다.
								<div className='input-group date' data-jquery='datetimepicker'>
									<input type='text' className="form-control"/>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
								<div className="text-right" style={{ marginTop: 10, marginBooton: 10 }}>
									// 부모에서 자식 메서드를 호출할때
									<button className="btn btn-default" type="button" onClick={this.handleClick}>자식호출</button>
								</div>
						</Datetimepicker>
						
						...
						
				);
			}

		});
```


















