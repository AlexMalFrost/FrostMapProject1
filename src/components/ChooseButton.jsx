import React, { useEffect, useState} from 'react';
import Map, { Marker, Popup} from 'react-map-gl';


export default function ChooseButton({ chooseButton, 
  setchooseButton, 
  setNewPlace,
  setNewMuft
	 }) {

  function handleAddClick() {
    setNewPlace(chooseButton);
    setchooseButton(null);
  };

   function handleMuftClick() {
    setNewMuft(chooseButton);
    setchooseButton(null);
  };
	
  return(chooseButton && (
          <Popup 
            latitude={chooseButton.lat}
            longitude={chooseButton.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setchooseButton(null)}>
            <div className="chosebuttons">
              <button type="submit" className="subbmitButton" onClick={handleAddClick}>
                Добавить метку
              </button>
                <div class="myspaceee"></div>
              <button type="submit" className="subbmitButton" onClick={handleMuftClick}>
                Добавить муфту
              </button>
            </div>
          </Popup>
        )
    );
}

