import { useState} from 'react';
import { Popup} from 'react-map-gl';
import NewMuft from "./NewMuft";
import NewPlace from "./NewPlace";


export default function ChooseButton({ chooseButton, 
  setchooseButton,
  mufts,
  setMufts,
  currentUsername,
  setPins,
  pins
	 }) {

  const [newMuft, setNewMuft] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  function handleAddClick() {
    setNewPlace(chooseButton);
    setchooseButton(null);
  };

  function handleMuftClick() {
    setNewMuft(chooseButton);
    setchooseButton(null);
  };
	
  return(
    <div>
      {chooseButton ?
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
                <div className="myspaceee"></div>
              <button type="submit" className="subbmitButton" onClick={handleMuftClick}>
                Добавить муфту
              </button>
            </div>
          </Popup> : null}
      {newMuft ? <NewMuft 
              newMuft = {newMuft}
              mufts = {mufts}
              setMufts = {setMufts}
              currentUsername = {currentUsername}
              setNewMuft = {setNewMuft} /> : null }
      {newPlace ? <NewPlace 
              newPlace = {newPlace}
              setPins = {setPins}
              pins = {pins}
              currentUsername = {currentUsername}
              setNewPlace = {setNewPlace} /> : null }
    </div>
    );
}

