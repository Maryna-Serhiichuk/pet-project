// import {
// 	setTitleGoods, 
// 	setGoods,
// } from './../actions/goodsActions'

let initialState = {
	goods: [],
}

const goodsReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case 'SET_GOODS':
			return {
				...state,
				goods: action.payload
			}

		default:
			return state;
	}
}

export default goodsReducer;
