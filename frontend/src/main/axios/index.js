import * as axios from 'axios'

const instance = axios.create({
    baseURL: '/'
})

export const getGoodsApi = () => {
    return instance.get('goods')
        .then(response => {
            return response.data
        })
}


export const addNewMealApi = (title, price, info, image = null) => {
    return instance.post('goods', {title, price, info, image})
}

export const changeInfoGoodsApi = (id, title, price, text, image) =>{
    return instance.put('goods', {id, title, price, info: text, image})
}

export const deleteGoodsApi = (id) =>{
    return instance.delete(`goods?delete=${id}`)
}