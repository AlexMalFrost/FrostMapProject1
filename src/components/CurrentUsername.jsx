import React, { useEffect, useState} from 'react';


export default function CurrentUsername({ currentUsername, 
	setShowRegister,
  setShowLogin,
  setCurrentUsername,
  myStorage
	 }) {

  const handleLogout = function () {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
    
	return(currentUsername ? (
        <div className="buttons">
          <button className="mybutton" onClick={handleLogout} style={{backgroundColor: 'red'}}>
            Log out
          </button>
            <div class="myspace"></div>
          <button
              className="mybutton"
              onClick={() => setShowRegister(true)} style={{backgroundColor: 'slateblue'}}
            >
              Register
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

