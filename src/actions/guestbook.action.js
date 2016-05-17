export const add = (memo) => {
	return { type: 'ADD', memo }
}

export const del = (id) => {
	return { type: 'DEL', id }
}

export const update = (id, memo) => {
	return { type: 'UPDATE', id, memo }
}
