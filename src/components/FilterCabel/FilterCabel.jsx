import "./FilterCabel.css";
import React, { useState, useEffect, useRef } from "react";


export default React.memo(function FilterCabel({ pins, dispatch}) {
	
	const [showFilterCabel, setShowFilterCabel] = useState('все кабеля');
	const [isActive, setIsActive] = useState(false);
	console.log('tytyty');

	useEffect(() => {
		return dispatch({type: "filteredCables", showFilterCabel});
	}, [showFilterCabel, dispatch]);
	
	/*useEffect(() => {
    setFiterPins(showFilterCabel);
  }, [showFilterCabel, setFiterPins]);*/
  //console.log(showFilterCabel);
	
	//setFiterPins(showFilterCabel);

	let arr1 = pins.map(item => item.title).filter((element, index, array) => array.indexOf(element) === index);
	let arr2 = ['все кабеля'];
	const options = [...arr1, ...arr2];

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
	
	/*if (showFilterCabel == arr2) {
    	console.log(fiterPins);
    	setFiterPins(pins);
    	console.log('bump bump');
    } else {
      const filterPinsMain = pins.filter(employee => {return employee.title === showFilterCabel;});
      //setFiterPins();
      console.log(filterPinsMain);
    }

	function pinFilter() { };*/

	return (
		<div className="dropdownCabel" >
			<div className="dropdown" >
		    <div className="dropdown-btn" onClick={ (e) => 
		      setIsActive(!isActive)}>
		      {showFilterCabel}
		      <span className="fas fa-caret-down"></span>
		    </div>
		    {isActive && (
		  	<div className="dropdown-content" ref={menuRef}>
		  	  {options.map(option => (
		  	  	<div key={option.toString()} onClick = {(e) => {
		  	  		setShowFilterCabel(option);
		  	  	  setIsActive(false);
		  	  	}}
		        className="dropdown-item">{option}</div>
		      ))}
		    </div>
		    )}
      </div>
		</div>
	);
})