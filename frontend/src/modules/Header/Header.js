import logo from './../../resources/images/002.jpg';

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

        {props.route === 'goods' ? <div className="addHotdog_button">
          <button onClick={props.addNewMealButton}>Add hot-dog</button>
        </div> : null}
      </header>
    </>
  );
}

export default Header;
