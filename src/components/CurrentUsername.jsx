import { useEffect, useState} from 'react';


export default function CurrentUsername({ currentUsername, 
	setShowRegister,
  setShowLogin,
  setCurrentUsername,
  myStorage
	 }) {

  function  handleLogout() {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
    
	return(currentUsername ? (
        <div className="buttons">
          <button className="mybutton" onClick={handleLogout} style={{backgroundColor: 'red'}}>
            Log out
          </button>
          <div className="myspace"></div>
            <button
              className="mybutton"
              onClick={() => setShowRegister(true)} style={{backgroundColor: 'slateblue'}}>
              Зарегистрировать
            </button>
          </div>
          ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
          </button>
        </div>
        )
    );
}

