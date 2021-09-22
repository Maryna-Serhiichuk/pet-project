
import React from 'react';
import {useState} from 'react'

function Goods(props) {
  let imageNotFound = "https://www.recycleall.ru/media/news/depositphotos_318221368-stock-illustration-missing-picture-page-for-website_Owmgdgy.jpeg";

  let [editGoods, setEditBlock] = useState(false);
  let [changeTitle, setChangeTitle] = useState('');
  let [changePrice, setChangePrice] = useState('');
  let [changeText, setChangeText] = useState('');
  let [changeImage, setChangeImage] = useState('');

  let imageGoods = <img src={props.image ? props.image : imageNotFound} />;

  function onChangeInfoGoods(){
    setChangeTitle(props.title);
    setChangePrice(props.price);
    setChangeText(props.info);
    setChangeImage(props.image == null ? '' : props.image);

    setEditBlock(true);
  }
  function offChangeInfoGoods(){
    setEditBlock(false);

    fixInfoGoods();
  }

  function changeTitleGoods(e){
    setChangeTitle(e.currentTarget.value);
  }
  function changePriceGoods(e){
    setChangePrice(e.currentTarget.value);
  }
  function changeTextGoods(e){
    setChangeText(e.currentTarget.value);
  }
  function changeImageGoods(e){
    setChangeImage(e.currentTarget.value);
  }

  function fixInfoGoods(){
    props.changeInfoGoods(props.id, changeTitle, changePrice, changeText, changeImage);
    setChangeTitle('');
    setChangePrice('');
    setChangeText('');
    setChangeImage('');
  }

  function deleteGoods(){
    props.deleteGoods(props.id);
    setEditBlock(false);
  }

  return (
    <>
    {editGoods 
    ? <div className="content_item">
        <div className="content_item_image">
          {imageGoods}
        </div>
        <div className="content_item_img edit">
          <input onChange={changeImageGoods} value={changeImage}/>
        </div>
        <div className="content_item_title edit">
          <input onChange={changeTitleGoods} value={changeTitle} />
        </div>
        <div className="content_item_price edit">
          <input onChange={changePriceGoods} value={changePrice} />
        </div>
        <div className="content_item_info edit">
          <textarea onChange={changeTextGoods}>
            {changeText}
          </textarea>
        </div>
        <div className="content_item_button">
          <button onClick={offChangeInfoGoods}>Upgrate</button>
          <button onClick={deleteGoods}>Delete</button>
        </div>
      </div>

    : <div className="content_item">
      <div className="content_item_image">
        {imageGoods}
      </div>
      <div className="content_item_title">
        {props.title}
      </div>
      <div className="content_item_price">
        {props.price}$
      </div>
      <div className="content_item_info">
        {props.info}
      </div>
      <div className="content_item_button">
        <button onClick={onChangeInfoGoods} >Edit</button>
      </div>
    </div>
    }
    </>
  );
}

export default Goods;
