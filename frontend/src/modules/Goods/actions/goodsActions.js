import { 
	getGoodsApi, 
	addNewMealApi,
	changeInfoGoodsApi,
	deleteGoodsApi
} from "../../../main/axios"

export const setGoods = (data) => {
	return {
		type: 'SET_GOODS',
		payload: data
	}
}

export const getGoods = () => {
	return (dispatch) => {
		getGoodsApi()
			.then(data => {
				dispatch( setGoods(data) )
			})
	}
}

export const addNewMeal = (title, price, info, image) => {
	return (dispatch, getState) => {
		addNewMealApi(title, price, info, image)

		dispatch( getGoods() );
	}
}

export const changeInfoGoods = (id, newTitle, newPrice, newText, newImage) => {
	return (dispatch, getState) => {
		changeInfoGoodsApi(id, newTitle, newPrice, newText, newImage)

		dispatch( getGoods() );
	}
}
export const deleteGoods = (id) => {
	return (dispatch, getState) => {
		deleteGoodsApi(id)

		dispatch( getGoods() );
	}
}




// export const deleteGoods = (id) => {
// 	return (dispatch, getState) => {
// 		const state = getState();

// 		let newState = state.goodsReducer.goods.filter(item => {
// 			if(item.id == id){
// 				return false
// 			}
// 			return true
// 		})

// 		dispatch( setInfoeGoods(newState) );
// 	}
// }

