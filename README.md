# React Tutorial #2 Guest Book : 리액트 방명록 만들기

### 개발환경

Mac OS X 10.11.14  
Node.js v0.12.7  
npm 2.11.3  
Atom 1.7.3  

React 15.0.1  
Babel 6.x.x

Blog Post: http://syaku.tistory.com/318  
GitHub Branch (프로그램 소스): https://github.com/syakuis/react-tutorials/tree/react-guestbook

## 관련 글

> 1. [React Tutorial #1 Install : 리액트 설치](http://syaku.tistory.com/317)
2. [React Tutorial #2 Guest Book : 리액트 방명록 만들기](http://syaku.tistory.com/318)
3. [React Tutorial #3 Guest Book Refactoring: 리액트 방명록 프로그램 리팩토링](http://syaku.tistory.com/319)
4. [React Tutorial #4 Guest Book Redux : 리액트 리듀스 방명록 프로그램](http://syaku.tistory.com/320)

### GuestBook 프로그램

이번 세션은 어떤식으로 프로그램을 개발하는 지에 대해 좀 더 상세히 알아보는 시간을 가지겠습니다. 그래서 예제로 방명록 프로그램을 직접 개발하여 하나하나 설명하도록 하겠습니다. 다른 새로운 오픈소스나 기술은 사용하지 않고 오직 React만 사용하여 개발하겠습니다. 이후 세션부터는 방명록 예제를 바탕으로 리펙토링을 거쳐 프로그램의 질을 높이는 과정을 내용으로 이어갈 생각입니다.

상단에 소개된 개발환경을 보면 `Sublime Text`가 아니라 [Atom](https://atom.io)으로 변경된 것을 볼 수 있습니다. 무엇이 좋다고 딱히 설명하긴 어렵지만 React를 사용하기에는 Atom의 플러그인 지원이 더 효율적인 것 같아  변경하였습니다. Atom React Plugin 설치하려면 https://orktes.github.io/atom-react 참고하세요.

그리고 JSX에서 ES2015 문법을 기본적으로 사용하지만 ES2015+ 문법을 사용할 경우도 있기에 `babel-preset-stage-2` 플러그인을 추가해야 합니다.

```
$ npm install -D babel-preset-stage-2
```

webpack load할때 stage-2를 추가해줍니다.

**< / > webpack.config.js**

```js
... Job ...

query: {
	presets: ['react', 'es2015', 'stage-2']
}

... Job ...

```
**ES2015(ECMAScript 6)에 대해 아래의 사이트를 참고하시면 도움이됩니다.**
> React on ES6+ https://babeljs.io/blog/2015/06/07/react-on-es6-plus  
Learn ES2015 https://babeljs.io/docs/learn-es2015/  
ES6 ECMAScript 6 — New Features: Overview & Comparison http://es6-features.org

디자인 UI 프레임워크은 [bootstrap](http://getbootstrap.com)과 [font-awesome](https://fortawesome.github.io/Font-Awesome) 라이브러리를 사용했습니다. 아래와 같이 설치해주세요.

```
// Bower 설치 있으면 생략...
$ sudo npm install -D bower

// 라이브러리 설치
$ bower update
```

이미 Bower 패키지로 설치해야할 라이브러리는 `bower.json`에 설정되어 있으니 update 명령어로 설치하시면 됩니다.

튜토리얼을 시작하기 전에 React Docs를 먼저 읽어보시길 바랍니다.
> 한글 http://reactkr.github.io/react/docs/getting-started-ko-KR.html  
영문 http://facebook.github.io/react/docs/getting-started.html

이제부터 GuestBook.jsx 소스를 하나하나 설명하겠습니다. Babel es2015를 사용하기 때문에 ECMAScript 6 문법으로 작성되었습니다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
```
React 모듈을 사용하기 위해 ES2015의 import 키워드를 사용해야 한다. ReactDOM API는 최종 JSX를 HTML 영역에 넘겨주는 역활을 하는 것 같은데 정확한 역활은 잘 모르겠네요. 0.14버전에 새로 추가된 API입니다. 추가하고 싶은 모듈(자바스크립트로 작성된 소스)이 있으면 위와 같이 작성하면 됩니다.

React 컴포넌트 클래스를 생성하려면 `React.createClass` 호출해야 합니다. 그리고 render 함수는 클래스 내부에 필수적으로 존재해야 합니다. **클래스 변수명의 첫글자는 꼭 대문자를 사용해야 합니다. JSX는 HTML 태그와 구분하기 위해 첫글자는 대문자로 사용합니다.** 그외에도 JSX에서 사용되는 HTML 엘리먼트들의 이름이 약간식 틀리기때문에 React API 참고하시기 바랍니다.

React에는 2가지의 데이터 방식이 있으며 모든 데이터는 단방향으로 흐릅니다. 즉 한쪽으로 흐르기 때문에 자식과 데이터를 공유하기 위해서는 부모에서 자식으로 데이터를 전달해야 합니다. 2가지 데이터는 `props(properties)`와 `state(stateless)`가 있습니다. props는 한번 값을 정의하면 변경할 수 없는 정적 변수이며 state는 언제든지 변경 할 수 있는 동적 변수입니다. React에서 절대로 변경할 수 없게 제어하는 것이 아니라 개발자가 꼭 이것을 지켜야할 의무가 있다라는 의미로 이해하시기 바랍니다. React에서는 state 사용을 최소화하고 props를 우선적으로 사용을 권장합니다. 그리고 부모의 state 데이터를 자식에게 전달할때는 props 변수에 전달되어야 합니다. 

`getInitialState` 함수는 React Component 클래스의 메서드이며 GuestBook 컴포넌트 클래스가 호출되기전에 딱 한번 호출되며 state 변수를 초기화합니다. memo는 input에 입력한 값을 임시로 저장했다가 등록 이벤트가 호출되면 data 변수에 값이 배열로 저장되게 됩니다.

`render` 함수를 이용하여 최종적으로 컴포넌트화할 수 있습니다. 내부의 소스를 살펴보겠습니다.

목록을 출력하는 items 변수입니다.

```js
var items = this.state.data.map((v, i) => {
	return(
		<li className="list-group-item" key={i}>
			<button type="button" className="close" onClick={() => this.deleteItemOne(i)}><span>&times;</span></button>
			<i className="fa fa-comments" aria-hidden="true"></i> {v}
		</li>
	);
});
```

JSX에서 반복적으로 엘리먼트를 생성할 때는 꼭 `key` 속성을 사용해야 합니다. 그리고 클릭 이벤트 속성에 함수를 사용할때는 `this.deleteItemOne(i)` 하게되면 반복문이  실행되는 동시에 함수가 호출되게 됩니다. 그래서 `{() => this.deleteItemOne(i)}` 처럼 작성하면 클릭 이벤트가 실행될때 함수가 호출되게 됩니다.

Babel es2015에서 함수를 사용할때는 아래와 같이 작성합니다.

```js
// ECMAScript 6
var func = v => { return v };
var func2 = (v, b) => { return v + b };

var obj = {
	func(v) {
		return v;
	},
	
	func2(v,b) {
		return v + b;
	}
}

// ECMAScript 5
functon func(v) { return v; }
functon func2(v, b) { return v + b; }

var obj = {
	func: function(v) {
		return v;
	},
	
	func2: function(v,b) {
		return v + b;
	}
}
```

items 변수는 `{items}`식으로 JSX에서 사용할 수 있습니다. 아래의 JSX 코드를 살펴겠습니다.

```
<input type="text" className="form-control" placeholder="내용을 입력하세요."
								onChange={this.handleChange}
								onKeyDown={this.handleKeyDown}
								autoFocus={true}
								value={this.state.memo} />
```

value 속성에는 state memo값을 지정해 놓게되면 input에 입력과 동식에 onChange 이벤트가 실행되게 됩니다. 그래서 value 속성을 사용할 경우 onChange 속성도 같이 작성해야 합니다. 

value에 값을 입력하면 handleChange함수가 실행되며 입력받은 값은 `event.target.value`로 얻을 수 있습니다. 그리고 state 데이터에 값을 저장합니다.
state 데이터에 값을 저장할때는 꼭 아래와 같이 해야합니다.

```js
this.state.memo = event.target.value; // 잘못된 방식입니다.

this.setState({ memo: event.target.value }); // 올바른 방식입니다.
```

handleChange 함수에서 state 데이터를 저장하고 그 아래 `console.log(this.state);` 로그를 출력해보면 handleChange 함수 내에서는 데이터가 변경되지 않고 외부에서 다시 state 데이터를 호출하면 업데이트된 값을 얻을 수 있다.

그리고 그 아래 등록 버튼이 있습니다. 등록버튼을 클릭하면 handleClick 함수를 호출합니다. 해당 함수에는 입력한 값을 data 배열에 저장하는 역활을 합니다. 아래 코드를 살펴보면 `...` 연사자가 있는 데 이것은 그외 값들을 의미합니다. jQuery extend와 비슷하지만 더 개선된 방식으로 es2015에서 사용할 수 있게 되었습니다.

```js
this.setState({
	memo: '',
	data: [ memo, ...data ]
});
```

`...` 연산자를 이용한 예제 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator

```js
var obj = [1,2,3,4];
var [one, ...obj] = obj; // one = 1, obj = [2,3,4]
console.log(one); // 1

var obj_extend = [...obj, {name: 'syaku', site: 'http://syaku.tistory.com'}];
console.log(obj_extend); // [2,3,4,{name: 'syaku', site: 'http://syaku.tistory.com'}]
```

위와 같은 결과를 얻을 수 있습니다. 엄청 간결해졌습니다.

**let 과 var의 차이점**

```js
var x = 'X';
let y = 'Y';
console.log(x, y); // X, Y
{
  var x = 'XX';
  let y = 'YY';
  console.log(x, y); // XX, YY
  {
    var x = 'XXX';
    let y = 'YYY';
    console.log(x, y); // XXX, YYY
  }
  console.log(x, y); // XXX, YY
}
console.log(x, y); // XXX, Y
```

let은 블럭 범위 변수이며 블럭 안에서만 변수의 값을 유지할 수 있습니다.

다음으로 볼 코드는 display에 선언된 JSX 코드 입니다. 이 소스가 중요한 이유는 JSX에서 엘리먼트는 **최상위 엘리먼트 1개만 존재**해야 합니다. 아래와 같이 `<div></div>` 엘리먼트가 최상위 부모가 되고 그 속에 자식 엘리먼트들이 존재하는 것을 볼 수 있습니다.

```js
let display = (
	<div>
		<p></p>
		<div className="alert alert-success">
			{this.state.memo} ({this.state.memo.length})
		</div>
	</div>
);
```
하지만 아래와 같이 코딩한다면 JSX 문법에 어긋나기때문에 오류가 발생합니다.

```js
let display = (
	<p></p>
	<div className="alert alert-success">
		{this.state.memo} ({this.state.memo.length})
	</div>
);
```

여기까지 React를 이용한 GuestBook 프로그램을 만들어보았고 그중에서 중요한 부분은 모두 설명한 것 같습니다. 다음 세션에는 본 예제를 이용하여 컴포넌트를 세분화하는 리팩토링과정을 설명할 것입니다. 아마 props 데이터를 직접 사용하는 내용를 볼 수 있을 것 같습니다.














