# React Tutorial #4 Guest Book Redux : 리액트 리듀스 방명록 프로그램

### 개발환경

Mac OS X 10.11.14  
Node.js v0.12.7  
npm 2.11.3  
Atom 1.7.3  

React 15.0.1  
React Redux 4.4.5  
Babel 6.x.x

Blog Post: http://syaku.tistory.com/320  
GitHub Branch (프로그램 소스): https://github.com/syakuis/react-tutorial/tree/react-guestbook-redux

## 관련 글

> 1. [React Tutorial #1 Install : 리액트 설치](http://syaku.tistory.com/317)
2. [React Tutorial #2 Guest Book : 리액트 방명록 만들기](http://syaku.tistory.com/318)
3. [React Tutorial #3 Guest Book Refactoring: 리액트 방명록 프로그램 리팩토링](http://syaku.tistory.com/319)
4. [React Tutorial #4 Guest Book Redux : 리액트 리듀스 방명록 프로그램](http://syaku.tistory.com/320)

### GuestBook Redux

이번 세션에서는 Redux를 사용하여 데이터를 효율적으로 관리해보겠습니다. Redux는 Flux 패턴을 구현한 라이브러리입니다. Flux 패턴이란 페이스북에서 개발한 프로그램 디자인 패턴으로 MVC 디자인 패턴의 문제점을 보완하기 위해 고안한 기술입니다. 하지만 MVC 패턴에 문제가 있다고 생각하지 않습니다. 좀 더 프론트엔드 혹은 리액트 라이브러리에 적합한 패턴이 필요했던 것이라 생각합니다.

Flux 패턴의 구현체가 완벽하지 않은 상태에 Dan Abramov 개발자는 Redux라는 Flux의 구현체를 개발하여 배포하였습니다. 단순히 Flux의 구현체를 개발한 것뿐만아니라 Redux만의 간결함과 편의성을 높이기 위해 노력한 결과물이기도 합니다.

**[Flux와 Redux 참고자료]**

Redux로의 카툰 안내서: http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/  
FLUX와 REDUX: https://taegon.kim/archives/5288  
Redux 한글번역: http://dobbit.github.io/redux/index.html

이전 세션에서 데이터를 한곳에서 관리하긴 했지만 이것을 여러 모듈에서 사용하려면 데이터 관리용 함수들을 매번 공유해야 하는 불편함과 데이터의 안정성이 보장되기 어렵습니다. 그래서 개발자가 직접 Flux 패턴을 개발하여 적용할 수 있겠지만 오픈소스 Redux를 사용하는 것도 효과적이라 생각하여 적용하였습니다.

Flux 패턴은 간단히 말해 데이터를 한곳에서 관리하고 전파하는 기술입니다. 그래서 소스가 간결해지고 가독성을 높일 수 있습니다.  MVC 패턴에 상응되는 장점들이 녹아 있습니다.

예제소스를 보면 각 역활마다 분리(파일로)되어 있어 처음 접하게 되면 가독성 떨어지고 액션, 디스패처, 스토어, 리듀서 등 생소한 용어때문에 더 어렵게 느껴질 수 있습니다. 무엇보다 어색한 ES2015 문법때문에 더욱더 불편함을 느낄 수 있습니다. 하지만 절대 어렵지 않습니다. 설명은 Redux 사이트에 참 잘되어 있지만 제가 좀 더 쉽게 연결관계에 대한 부분 설명하도록 하겠습니다. Redux 한글번역판이나 http://redux.js.org/ 같이 보시면 도움이 많이 됩니다. 단 제가 쓰는 표현이나 용어가 올바르지 않을 수 있습니다.

먼저 React용 Redux를 설치합니다.

```
$ npm install -S react-redux
```

Redux는 각 역활을 세분화 하고 있습니다. 크게 액션, 리듀스, 스토어로 나뉩니다. 

**< / > index.js**

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import guestBookReducer from './reducers/guestbook.reducer';

import GuestBook from './containers/GuestBook.jsx';

// conosle.log = { guestbook, actions }
let store = createStore(guestBookReducer)

render(
	<Provider store={store}>
		<GuestBook />
	</Provider>,
	document.getElementById('app')
)
```
react-redux 모듈에서 Provider 컴포넌트를 호출하고 redux 모듈에서 createStore 함수를 호출합니다. 

Provider는 생성한 스토어를 GuestBook 컴포넌트에 전달하는 역활을 합니다. 스토어(store 변수)에는 최종 데이터 guestbook과 store의 데이터를 관리하는 actions을 가지고 있습니다. action은 데이터를 어떻게 관리(CRUD : Create, Read, Update, Delete)될지 역활을 정의하는 곳입니다. 실제 데이터를 처리하는 로직은 action에서 구현하지 않습니다. 이것은 Reducer에서 하는 일입니다. action은 컴포넌트와 Reducer 사이를 연결해주는 인터페이스입니다. 그래서 action과 reducer는 서로 밀접한관계를 가지고 있습니다.

**< / > GuestBook.jsx**

```js
// store guestbook 데이터를 props에 바인딩 합니다.
const mapStateToProps = (state) => {
	return {
		guestbook: state.guestbook
	}
}

// 액션을 사용할 수 있게 생성하고 props에 바인딩 합니다.
const mapDispatchToProps = (dispatch) => {
	return {
	  actions: bindActionCreators(GuestBookAction, dispatch)
	}
}

// redux helper coontect를 이용하여 구현합니다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestBook)
```
redux 모듈에서 connect 함수를 호출하여 상태 데이터와 액션을 연결해줍니다. 이렇게 연결되면 props를 이용하여 접근할 수 있습니다.

```
this.props.guestbook // 전체 데이터

this.props.actions.액션타입 // 액션 호출
```

**< / > guestbook.action.js**

```js
export const add = (memo) => {
	return { type: 'ADD', memo }
}

export const del = (id) => {
	return { type: 'DEL', id }
}

export const update = (id, memo) => {
	return { type: 'UPDATE', id, memo }
}
```

action은 어떤 작업을 수행할지 역활을 정의합니다. 액션의 역활은 type으로 정의하며 필수 입력사항입니다. 나머지는 매개변수로 사용됩니다.

[참고] export 와 export default 차이 : http://nodejs.github.io/nodejs-ko/articles/2015/05/11/story-about-js-and-babel

**< / > guestbook.js**

```js
const defaultState = [];

const guestbook = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD':
			return [
				{
					id: state.reduce((maxId, o) => Math.max(o.id, maxId), -1) + 1,
					memo: action.memo
				},
				...state
			]
		case 'UPDATE':
			return state.map(o => o.id === action.id ? Object.assign({}, o, { memo: action.memo }) : o)
		case 'DEL':
			return state.filter(o => o.id !== action.id)
		default: // 기본은 모든 데이터 조회함.
			return state
	}
}

export default guestbook
```

Reducer는 action 타입을 매칭하여 해당 작업을 실제적으로 수행하여 데이터에 전달합니다. Reducer는 여러개로 분리하여 관리할 수 있습니다. 그래서 아래와 같이 최종적으로 등록하여 guestBookReducer를 생성합니다.

```js
import { combineReducers } from 'redux'
import guestbook from './guestbook'

const guestBookReducer = combineReducers({ guestbook })

export default guestBookReducer
```

그외 작업은 이미 이전에 했던 부분이라 설명은 생략하겠습니다.















