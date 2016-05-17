import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import guestBookReducer from './reducers/guestbook.reducer';

import GuestBook from './containers/GuestBook.jsx';

let store = createStore(guestBookReducer)

render(
	<Provider store={store}>
		<GuestBook />
	</Provider>,
	document.getElementById('app')
)
