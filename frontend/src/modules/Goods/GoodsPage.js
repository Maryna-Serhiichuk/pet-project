import React from 'react';
import Goods from './components/Goods'

function GoodsPage(props){
  // console.log(props.data.goods)
  return (
    <div className="content">

      <div className="content_goods">
        <div className="content_title">
          All hot-dog
        </div>

        <div className="content_items">
          {props.data.goods && props.data.goods.map( item => <Goods 
            key={item.id}
            id={item.id} 
            title={item.title} 
            price={item.price} 
            info={item.info} 
            image={item.image}
            changeInfoGoods={props.data.changeInfoGoods} 
            deleteGoods={props.data.deleteGoods}/>)}
        </div>
      </div>
    </div>
  )
}

export default GoodsPage;