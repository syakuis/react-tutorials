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
