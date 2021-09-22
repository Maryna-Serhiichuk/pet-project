
import React, {useEffect, useState} from 'react';
import GoodsPage from './GoodsPage'
import {connect} from 'react-redux'
import {
  changeInfoGoods,
  deleteGoods,
  addNewMeal, 
  getGoods
} from './actions/goodsActions'
import Header from './../Header/Header'
import { Route } from 'react-router-dom';
import AddGoodsForm from './components/AddGoodsForm';

function GoodsApiContainer(props) {
  // console.log(props.goods)

  useEffect( () => {
    props.getGoods();
  }, [] )

  let [addMeal, setAddMeal] = useState(false);

  function addNewMealButton(){
    setAddMeal(true);
  }
  function cancelAddNewMeal(){
    setAddMeal(false);
  }
  function addNewMealForm(name, price, description, image){
    props.addNewMeal(name, price, description, image);
    cancelAddNewMeal();
  }

  return (
    <>
    <Header addNewMealButton={addNewMealButton} route={'goods'}/>

    {addMeal && <AddGoodsForm 
      goods={props.goods}
      addNewMealForm={addNewMealForm} 
      cancelAddNewMeal={cancelAddNewMeal} 
      cancelAddNewMeal={cancelAddNewMeal} /> }

    <Route 
      path='/goods'
      render={ () => <GoodsPage data={props}/> }/>
    </>
  );
}

let mapStateToProps = (state) => {
  return {
    goods: state.goodsReducer.goods,
  }
}

const GoodsContainer = connect(mapStateToProps, {
  changeInfoGoods,
  deleteGoods,
  addNewMeal,
  getGoods
})(GoodsApiContainer);

export default GoodsContainer;
