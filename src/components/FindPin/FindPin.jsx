import "./FindPin.css";
import FindPinNow from "./FindPinNow";
import FindMufNow from "./FindMufNow";
import React, {  useState, useRef } from "react";

const showFindPin = ['найти'];

export default function FindPin({ pins, 
	mufts, 
	viewport, 
	setViewport, 
	setPins, 
	setMufts, 
	setCurrentPlace }) {
	
	const [isActive, setIsActive] = useState(false);
	const [newPinPlace, setNewPinPlace] = useState(false);
	const [newMuf, setNewMuf] = useState(false);
	console.log('lalala');
	console.log('viewport.latitude');

	function FindMufPin(option) {
    if (option === 'муфту') {
    	setNewMuf(true);
      console.log('find pin');
    }
    else {
    	setNewPinPlace(true);
    	console.log('find pin');
    }
  };

	const options = ['метку', 'муфту'];

	let menuRef = useRef(null);
	useState(() => {
		let handler = (e) => {
			if ( !menuRef.current?.contains( e.target )) {
				setIsActive( false );
			} else {
				setIsActive( true );
			  }
		};
		document.addEventListener("mousedown", handler);
		return() => {document.removeEventListener("mousedown", handler);
	  };
	});

	return (
		<>
		<div className="dropdownFindPin" >
			<div className="findpin" >
		    <div className="findpin-btn" onClick={ (e) => 
		      setIsActive(!isActive)}>
		      {showFindPin}
		      <span className="fas fa-caret-down"></span>
		    </div>
		    {isActive && (
		  	<div className="findpin-content" ref={menuRef}>
		  	  {options.map(option => (
		  	  	<div key={option.toString()} onClick = {(e) => {
		  	  		FindMufPin(option);
		  	  	  setIsActive(false);
		  	  	}}
		        className="findpin-item">{option}</div>
		      ))}
		    </div>
		    )}
      </div>
		</div>
		{newPinPlace ? <FindPinNow 
		          setCurrentPlace = {setCurrentPlace}
              newPinPlace = {newPinPlace}
              pins = {pins}
              setNewPinPlace = {setNewPinPlace}
              setViewport = {setViewport} /> : null }
    {newMuf ? <FindMufNow 
              setCurrentPlace = {setCurrentPlace}
              newMuf = {newMuf}
              mufts = {mufts}
              setNewMuf = {setNewMuf}
              setViewport = {setViewport} /> : null }
    </>
	);
}