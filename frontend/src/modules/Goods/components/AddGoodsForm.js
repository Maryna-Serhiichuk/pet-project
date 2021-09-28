import React, { useState } from 'react'
import {Formik, Field} from 'formik';

function AddGoodsForm(props){
  let titles = props.goods.map(item => item.title);
  let [validateTitle, setValidateTitle] = useState(false);
    return (
        <div className="addMeal_screen">
          <div className="addMeal_block">
            <div className="addMeal_title">Add new hot-dog</div>

            <Formik
              initialValues={{
                name: '',
                price: '',
                description: '',
                image: ''
              }}
              onSubmit={ (value) => {
                if(!titles.includes(value.name) && value.name && value.price && value.description){
                  props.addNewMealForm(value.name, value.price, value.description, value.image);
                  props.cancelAddNewMeal();
                }
              }}
              validate={(value) => {
                setValidateTitle(titles.includes(value.name));
              }}
            >
            {({values, handleSubmit, handleChange, resetForm}) => (
              <form onSubmit={handleSubmit}>
                <Field 
                  name='name' 
                  values={values.name} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Name" 
                  className={validateTitle ? "addMeal_errorValidateTitle" : ''}
                  /><div className="addMeal_errorValidateTitle__text">{validateTitle ? 'this name already exists' : ''}</div>
                <Field 
                  name='price' 
                  values={values.price} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Price"/>
                <Field 
                  name='description' 
                  values={values.description} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="Description"/>
                <Field
                  name='image' 
                  values={values.image} 
                  onChange={handleChange} 
                  type="text" 
                  placeholder="ImageURL"/>

                {/* <input type="file" id="addMeal_image"/>
                <label for="addMeal_image">Image</label> */}

                <div className="addMeal_controlButtons">
                  <button onClick={props.cancelAddNewMeal}>No Thanks</button>
                  <button type='submit'>Add</button>
                </div>
              </form>
            )}

            </Formik>

          </div>
        </div>
    )
}

export default AddGoodsForm;