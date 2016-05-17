# React Tutorial #1 Install : 리액트 설치

## 개발환경

Mac OS X 10.11.14  
Node.js v0.12.7  
npm 2.11.3  
Sublime Text 3  

Blog Post: http://syaku.tistory.com/317  
GitHub Branch: https://github.com/syakuis/react-tutorial/tree/react-install

## 관련 글

> 1. [React Tutorial #1 Install : 리액트 설치](http://syaku.tistory.com/317)
2. [React Tutorial #2 Guest Book : 리액트 방명록 만들기](http://syaku.tistory.com/318)
3. [React Tutorial #3 Guest Book Refactoring: 리액트 방명록 프로그램 리팩토링](http://syaku.tistory.com/319)
4. [React Tutorial #4 Guest Book Redux : 리액트 리듀스 방명록 프로그램](http://syaku.tistory.com/320)


## React 

리액트는 페이스북에서 개발한 자바스크립트 라이브러리입니다. 요즘 프로젝트를 보면 UI에 대한 부분을 많이 신경쓰다보니 자바스크립트 코딩영역도 자연스럽게 많아 졌습니다.  그로인해 자바스크립트 프로그램에 대한 유지보스가 더욱 복잡해졌습니다. 중복되는 함수, 중복되는 변수 어디서 부터 시작되는 지 알 수 없는 난입된 스크립트들... 그래도 원시 DOM을 제어하는 jQuery 덕분에 조금 간결해진 소스를 사용하고 있지만 그래도 복잡한건 여전합니다. 무엇보다 자바스크립트로 인해 발생하는 성능 저하가 근본적인 문제입니다. 이런 문제들을 체계적으로 해결하면서 보다 빠른 퍼포먼스를 지원하고 이전에 개발 방법보다 한층 더 체계적이면서 오류 해결도 쉬운 개발 방법을 제공하는 것이 리액트입니다. 그렇다고 모든 것을 리액트가 하는 것은 아니지만 리액트로 인해 자연스럽게 현대적 기술들을 전목할 수 있는 가이드라인 역활을 하고 있는 것은 분명합니다.

최근에 AngularJS도 AngularJS 1.x를 계승하지 않고 새롭게 설계된 AngularJS 2를 공개하기도 했습니다. AngularJS 2도 리액트의 기술을 따라가고 있는 상황입니다.

리액트를 사용하면서 처음 혼란스러웠던 것은 이전의 개발은 HTML이 메인베이스라면 여기에 모든 것을 프로그래밍하고 호출하였지만 리액트는 리액트가 메인베이스입니다. 즉 HTML은 칠판이고 분필은 React입니다. 그래서 모든 화면 구성은 리액트에서 관장하며 보내는 것 또한 리액트에서 결정합니다. HTML은 결과를 출력해주는 보더일 뿐입니다. HTML에서 원하는 리액트의 컴포넌트를 맘데로 호출할 수 있는 구조가 아니라는 것입니다.

React의 장점은 HTML 태그를 직접 컴포넌트화 하여 직관적으로 사용할 수 있는 것과 HTML DOM을 직접 사용하지 않고 React에서 제어할 수 있는 가상 DOM을 만들어 최적화된 결과를 HTML에 전달하므로 속도를 개선한부분입니다.

## React 설치 및 개발환경 구성

[React](https://facebook.github.io/react/index.html)를 설치하기 위해 [npm](https://www.npmjs.com)패키지 관리자를 필요합니다. 필수는 아니지만 다양한 패키지를 관리할때 편리합니다. npm은 [Node.js](https://nodejs.org)에 포함되어 있으므로  Node.js를 설치하면 됩니다.

React 최신버전(15.0.1)은 [Babel](http://babeljs.io)에 의존하고 있습니다. 현대적 자바스크립트 기술을 지원하는 개발 도구이며 어떠한 브라우저 환경에서든 최적의 상태로 동작될 수 있게 컴파일합니다. 도움말을 보면 Babel을 이용하여 컴파일없이 바로 실행될 수 있게 babel-browser을 사용하고 있지만 React의 처리 속도를 고려한다면 컴파일 방식이 효율적입니다. 그래서 저는 컴파일 방식을 이용할 것이고, `ES2015` 문법으로 개발할 것입니다.

ES2015란 자바스크립트 표준 규격입니다. 우리는 주로 ECMAScript 5를 사용해왔습니다. 현재도 그렇게 사용하고 있습니다. 하지만 좀 더 고도화된 기술을 요하는 작업들이 많아지면서 이런 기술들을 대응하기 위해 개선된 표준 규격을 발표하는 데 이것이 ECMAScript 6이며 ECMAScript 6를 ES2015라고 변경하여 부르기로 하여 최종 명칭은 ES2015라고 합니다. ECMAScript 7은 ES2016이라고 부릅니다.

[참고] https://developer.mozilla.org/ko/docs/Web/JavaScript/JavaScript_technologies_overview

Node.js와 npm을 설치한 상태에서 아래의 작업을 진행합니다.

```
$ npm init
```
프로젝트를 생성하려는 폴더에서 npm 패키지 생성합니다. 중요한 설정은 아니니 대충 입력합니다. 생성한 패키지 정보는 아래와 같습니다.

**< / > package.json**

```
{
  "name": "react-tutorial",
  "version": "1.0.0",
  "description": "ReactJS Tutorial",
  "main": "bundle.js",
  "scripts": {
  },
  "keywords": [
    "react"
  ],
  "author": "Syaku <http://syaku.tistory.com> (최석균)",
  "license": "MIT"
}
```
다음은 React 개발에 필요한 패키지를 설치합니다.

```
$ sudo npm install -D babel-core babel-loader babel-preset-es2015 babel-preset-react webpack webpack-dev-server html-webpack-plugin
```
`-D` 옵션은 개발자 의존성에 패키지를 정의합니다. [webpack](https://webpack.github.io)은 여러 자바스크립트들을 모듈화하여 관리할 수 있게 하는 빌드형 개발툴입니다. React 개발시 아주 유용한 개발툴입니다. 이제 React를 설치합니다.

```
$ npm install -S react react-dom
```
설치가 완료되면 React를 이용하여 `Hello World!!`를 출력하는 예제 프로그램을 만들어 보겠습니다.

그리고 추천드리는 에디터는 [Sublime Text](https://www.sublimetext.com)와 [Atom](https://atom.io) 혹은 [Jetbrains](https://www.jetbrains.com/)과 같은 플러그인을 쉽게 설치하여 다양한 언어를 지원하는 개발툴을 사용하는 것이 좋습니다. 본 튜토리얼에는 Sublime Text 3를 사용하였습니다. React와 Bebel 플로그인을 설치하면 개발에 많은 도움이 됩니다.

React 예제의 폴더구조는 아래와 같습니다. 임의적으로 정한거니 꼭 이렇게 해야하는 건 아닙니다. 컴파일 될 소스는 src 폴더에 컴파일 된 소스는 dist 폴더에 생성됩니다.

```
/react-tutorial/
	|- src/
		|- js/
			|- HelloWorld.jsx
		|- index.html
	|- dist/
		|- bundle.js		
	|- webpack.config.js
	|- package.json
```	

HelloWorld.jsx는 React 사용자 인터페이스 프로그램하는 파일이며 컴파일 되기 전의 소스입니다. 꼭 확장자를 jsx를 하지 않아도 됩니다. 전 React 소스파일만 따로 구분하기 위해 jsx라고 하였습니다. 컴파일되면 dist 폴더 아래 bundle.js가 생성됩니다. 이것은 webpack에 의해 생성되는 것입니다. webpack은 JSX 파일을 컴파일하며, 플러그인을 이용하여 임시의 웹서버를 구동할 수 있어 개발에 유용한 기능들을 제공합니다. 

webpack을 사용하기 위해 설정파일을 만들어야 합니다. 그리고 테스트를 위한 임시용 웹서버는 webpack-dev-server 플러그인에서 지원합니다. 소스가 변경되면 자동으로 리로드해주므로 개발시 필수적인 플러그인입니다.

**< / > webpack.config.js**

```javascript

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	entry: './src/js/HelloWorld.jsx',

	output: {
		path: './dist',
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],

	module: {
		loaders: [
			{
				test: /\.jsx$/, // 로더를 사용할 확장자를 추가합니다.
				exclude: /node_modules/, // 로더 사용을 제외한 대상을 추가합니다.
				loader: 'babel', // 로더를 설정합니다.
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},

	devServer: {
		inline: true, // 자동 리로드여부를 선택합니다.
		hot: true, // html 자동 리로드여부를 선택합니다. (정확한 역활을 모르겠네요)
		port:8888,
		contentBase: './' // 서버 웹루트 경로를 설정합니다.
	},
}
```

html-webpack-plugin은 html 파일을 dist 폴더에 생성해줍니다. 여기서 중요한 것은 output.path 경로 아래 index.html 파일도 함께 있어야 합니다. 그렇지 않으면  webpack-dev-server에서 변경된 소스를 판단하지 못해 리로드가 되지 않습니다. 이제 빌드하고 서버를 구동해보겠습니다.

npm에서 쉽게 빌드하고 서버를 구동하기 위해 패키지 설정 파일에 아래와 같이 추가합니다.

**< / > package.json**

```
  "scripts": {
    "build": "webpack",
    "server": "webpack-dev-server"
  },
```

npm으로 빌드 및 서버 구동하기.

```
$ npm run build // 빌드할 경우
$ npm run server // 서버 구동할 경우
```

빌드후 서버를 구동하고 http://localhost:8888 으로 접속합니다. 페이지가 정상적으로 출력되는 지 확인합니다.  
그리고 자동리로드가 잘되는 지 HelloWorld.jsx 파일의 소스를 수정해봅니다. 그럼 브라우저를 직접 새로고침하지 않더라도 자동으로 반영되는 것을 확인할 수 있습니다.



