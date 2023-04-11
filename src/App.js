
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Map from 'react-map-gl';
import React, { useReducer, useState } from 'react';
import axios from 'axios';
import Register from "./components/Register/Register";
import RegisterRemove from "./components/Register/RegisterRemove";
import Login from "./components/Login/Login";
import Mufts from "./components/Mufts";
import Pins from "./components/Pins";
import ChooseButton from "./components/ChooseButton/ChooseButton";
import CurrentUsername from "./components/CurrentUsername";
import Warning from "./components/Warning/Warning";
import PolylineLayer from "./components/FilterCabel/PolylineLayer";
import FilterCabel from "./components/FilterCabel/FilterCabel";
import FindPin from "./components/FindPin/FindPin";
import ShowPin from "./components/ShowPin";
import ShowMuft from "./components/ShowMuft";

function App() {
  const Tok = process.env.REACT_APP_MAPBOX;
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [chooseButton, setchooseButton] = useState(null);
  const [pins, setPins] = useState(null);
  const [mufts, setMufts] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 55.832669, 
    longitude: 48.784813,
    zoom:16,
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case "filteredCables":
        return {fiterPins: action.showFilterCabel};
      default:
        throw new Error();
    }
  };
  const [{fiterPins}, dispatch] = useReducer(reducer, {fiterPins: null});
  
  useState(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        const allMufs = await axios.get("/muftas");
        setPins(allPins.data);
        setMufts(allMufs.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleChooseClick = function (e) {
    if (currentUsername !== null) {
      setchooseButton({
        lat: e.lngLat.lat,
        long: e.lngLat.lng
      });
    } else {
      setShowWarning(true)
    }
  };

  return (
    <div className="App">
      < Map 
      {...viewport}
      mapboxAccessToken={Tok}
      onMove={evt => setViewport(evt.viewport)}
      style={{
        position: "absolute",
      }}
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      onDblClick={handleChooseClick}
      transitionDuration="200">
        {currentPlace ? 
          <ShowPin 
              setCurrentPlace = {setCurrentPlace}
              setPins = {setPins}
              pins = {pins}
              currentPlace = {currentPlace} /> : null}
        {currentPlace ? 
          <ShowMuft 
              setCurrentPlace = {setCurrentPlace}
              setMufts = {setMufts}
              mufts = {mufts}
              currentPlace = {currentPlace} /> : null}
        {pins ? 
          <Pins 
              pins = {pins}
              setCurrentPlace = {setCurrentPlace}
              setShowWarning={setShowWarning} 
              currentUsername = {currentUsername}
              setPins = {setPins} /> : null}
        {mufts ? 
          <Mufts 
              mufts = {mufts}
              currentUsername = {currentUsername}
              setCurrentPlace = {setCurrentPlace}
              setShowWarning={setShowWarning}
              setMufts = {setMufts} /> : null}
        {currentUsername && pins ?  
          <FilterCabel 
              pins = {pins}
              dispatch = {dispatch} /> : null}
        {currentUsername && pins ?  
          <FindPin 
              pins = {pins}
              setCurrentPlace = {setCurrentPlace}
              setPins = {setPins}
              mufts = {mufts}
              viewport = {viewport}
              setViewport = {setViewport} /> : null}
        {currentUsername && pins ?
          <PolylineLayer 
              pins = {pins}
              fiterPins = {fiterPins} /> : null}
        {<ChooseButton 
              chooseButton = {chooseButton}
              setchooseButton  = {setchooseButton}
              mufts = {mufts}
              setMufts = {setMufts}
              currentUsername = {currentUsername}
              setPins = {setPins}
              pins = {pins} />}
        {<CurrentUsername 
              currentUsername = {currentUsername}
              myStorage = {myStorage}
              setCurrentUsername = {setCurrentUsername}
              setShowRegister = {setShowRegister}
              setShowLogin = {setShowLogin} />}
        {showRegister && 
          <Register 
              setShowRegister={setShowRegister} />}
        {currentUsername &&  
          <RegisterRemove 
              currentUsername = {currentUsername} 
              setCurrentUsername = {setCurrentUsername}
              myStorage = {myStorage} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
        
        {showWarning && (
          <Warning
            setShowWarning={setShowWarning}  
          />
        )}
      </Map>
    </div>  
  );
}

export default App;