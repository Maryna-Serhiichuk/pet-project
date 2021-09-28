import logo from './../../resources/images/002.jpg';
import { Route } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header>
        <div className="nameSite">
          <div className="nameSite_logo">
            <img src={logo} />
          </div>
          <div className="nameSite_name">
            Crud
          </div>
        </div>

        <Route 
          path='/goods'
          render={ () => <AddFoodButton {...props}/> }/>

      </header>
    </>
  );
}

function AddFoodButton(props){
  return (
    <div className="addHotdog_button">
      <button onClick={props.addNewMealButton}>Add hot-dog</button>
    </div>
  )
}

export default Header;
