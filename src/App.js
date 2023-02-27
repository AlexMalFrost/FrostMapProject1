
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Map, { Marker, Popup} from 'react-map-gl';
import React, { useEffect, useState} from 'react';
import { Room} from "@material-ui/icons";
import axios from 'axios';
import Register from "./components/Register";
import Login from "./components/Login";
import Mufts from "./components/Mufts";
import Pins from "./components/Pins";
import NewPlace from "./components/NewPlace";
import NewMuft from "./components/NewMuft";
import ChooseButton from "./components/ChooseButton";
import CurrentUsername from "./components/CurrentUsername";
import Warning from "./components/Warning";
import PolylineLayer from "./components/PolylineLayer";
import { Source, Layer } from "react-map-gl";

function App() {
  const Tok = process.env.REACT_APP_MAPBOX;
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [newPlace, setNewPlace] = useState(null);
  const [chooseButton, setchooseButton] = useState(null);
  const [newMuft, setNewMuft] = useState(null);
  const [pins, setPins] = useState([]);
  const [mufts, setMufts] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 55.832669, 
    longitude: 48.784813,
    zoom:16,
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  const GetCabelData = useEffect(() => {
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
        {<ChooseButton 
              chooseButton = {chooseButton}
              setchooseButton  = {setchooseButton}
              //handleAddClick = {handleAddClick}
              //handleMuftClick = {handleMuftClick}
              setNewPlace = {setNewPlace}
              setNewMuft = {setNewMuft} />}
        {<PolylineLayer 
              pins = {pins} />}
        {<Mufts 
              mufts = {mufts}
              currentUsername = {currentUsername}
              viewport = {viewport}
              setViewport = {setViewport}
              setShowWarning={setShowWarning}
              currentPlaceId = {currentPlaceId} 
              setCurrentPlaceId = {setCurrentPlaceId}
              setMufts = {setMufts} />}
        {<Pins 
              pins = {pins}
              viewport = {viewport}
              setViewport = {setViewport}
              setShowWarning={setShowWarning}
              currentPlaceId = {currentPlaceId}
              setCurrentPlaceId = {setCurrentPlaceId} 
              currentUsername = {currentUsername}
              setPins = {setPins} />}
        {<NewPlace 
              newPlace = {newPlace}
              setPins = {setPins}
              pins = {pins}
              currentUsername = {currentUsername}
              setNewPlace = {setNewPlace} />}
        {<NewMuft 
              newMuft = {newMuft}
              mufts = {mufts}
              setMufts = {setMufts}
              currentUsername = {currentUsername}
              setNewMuft = {setNewMuft}/>}
        {<CurrentUsername 
              currentUsername = {currentUsername}
              myStorage = {myStorage}
              setCurrentUsername = {setCurrentUsername}
              setShowRegister = {setShowRegister}
              setShowLogin = {setShowLogin} />}
        
        //Source id="polylineLayer"
        {showRegister && <Register setShowRegister={setShowRegister} />}
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
