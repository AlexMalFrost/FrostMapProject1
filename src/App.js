
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Map, { Marker, Popup} from 'react-map-gl';
import React, { useEffect, useState} from 'react';
import { Room} from "@material-ui/icons";
import axios from 'axios';
import Register from "./components/Register";
import Login from "./components/Login";
import Warning from "./components/Warning";

import { Source, Layer } from "react-map-gl";
var groupArray = require('group-array');

const Tok = process.env.REACT_APP_MAPBOX;
function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [newPlace, setNewPlace] = useState(null);
  const [chooseButton, setchooseButton] = useState(null);
  const [newMuft, setNewMuft] = useState(null);
  const [pins, setPins] = useState([]);
  const [mufts, setMufts] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [numb1, setNumb1] = useState(null);
  const [numb2, setNumb2] = useState(null);
  const [delited, setDelited] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 55.832669, 
    longitude: 48.784813,
    zoom:16,
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  console.log(currentUsername);
  

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    const getMufs = async () => {
      try {
        const allMufs = await axios.get("/muftas");
        setMufts(allMufs.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMufs();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    if (currentUsername !== null) 
      {setCurrentPlaceId(id);
      setViewport({ ...viewport, latitude: lat, longitude: long });}
      else {setShowWarning(true)}
  };

  const handleAddClick = (e) => {    
    setNewPlace({
      lat: chooseButton.lat,
      long: chooseButton.long,
    });
  };

  const handleMuftClick = (e) => {
    setNewMuft({
      lat: chooseButton.lat,
      long: chooseButton.long,
    });
  };

  const handleChooseClick = (e) => {
    if (currentUsername !== null) {
      console.log(e)
      console.log(e.lngLat);
      const longitude = e.lngLat.lng;
      const latitude = e.lngLat.lat;
      setchooseButton({
        lat: latitude,
        long: longitude,
      });
    } else {setShowWarning(true)}
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      numb1,
      numb2,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const selected = Object.values(pins).find(e => e.numb1 == numb1 && e.numb2 == numb2);
      console.log(selected);
      if (selected) {
        const res = await axios.post("/pins/update", newPin);
        setPins([...pins, res.data]);
        setNewPlace(null);
        console.log('hi');
      } else {
        const res = await axios.post("/pins", newPin);
        setPins([...pins, res.data]);
        setNewPlace(null);
        console.log('bye');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitMuf = async (e) => {
    //e.preventDefault();
    const newMuf = {
      username: currentUsername,
      title,
      desc,
      numb1,
      lat: newMuft.lat,
      long: newMuft.long,
    };
    try {
      const res = await axios.post("/muftas", newMuf);
      setMufts([...mufts, res.data]);
      setNewPlace(null);
      console.log('mufts mufts mufts');
    } catch (err) {
      console.log(err);
    }
  };


  const deleteSubmit = async () => {
    const mydelited = {
      delited: delited,
    };
    try {
      await axios.post("/pins/delete", mydelited);
    } catch (err) {
      console.log(err);
    }
  };

  const mufDeleteSubmit = async () => {
    const mydelited = {
      delited: delited,
    };
    try {
      await axios.post("/muftas/delete", mydelited);
    } catch (err) {
      console.log(err);
    }
  };

  //const usersByColor = pins.reduce((acc, value) => {
    //if (!acc[value.title]) {
      //acc[value.title] = [];}
      //acc[value.title].push(value);
      //return acc;
    //}, []);

  var bnb = groupArray(pins, 'title', 'numb2');
  let arr = Object.values(bnb);
  //let arr = Object.entries(bnb).map(entry => entry[1]);
  let result = arr.reduce(function (r, o) {
        Object.keys(o).forEach(function (k) {
            r.push(o[k]);
        });
        return r;
    }, []);

  
  //var newArray = usersByColor.filter(value => Object.keys(value).length !== 0);
  console.log(arr);
  console.log(result);
  //console.log(newArray);


  var resultt = result.map(function(array, index) { 
    return array.map(t=>([t.long, t.lat]));
  });
  
  //const pinSourse = pins.map(t=>([t.long, t.lat]));
  
  const dataOne = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiLineString",
        coordinates: resultt,
      },
    };

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
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
        {chooseButton && (
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
        )}
        {mufts.map(p=>(
          <>
            <Marker 
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10} >
              <Room style={{fontSize:30, color: "blue", cursor: "pointer",}}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)} />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup 
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                onOpen={() => setDelited(p._id)}
                anchor="top" >
                  <div className="card">
                        <label>Имя муфты</label>
                        <p className="place">{p.title}</p>
                        <label>Описание</label>
                        <p className="desc">{p.desc}</p>
                        <label>Номер муфты</label>
                        <p className="desc">{p.numb1}</p>
                        <form onSubmit={mufDeleteSubmit}>
                          <button className="deleteButton">
                            Delete
                          </button>
                        </form>
                        <label>Доп. информация</label>
                        <span className="username">
                          Created by <b>{p.username}</b>
                        </span>
                  </div>
              </Popup>
            )}
          </>
        ))}
        {pins.map(p=>(
          <>
            <Marker 
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10} >
              <Room style={{fontSize:30, color:
                currentUsername === p.username ? "tomato" : "slateblue", cursor: "pointer",}}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)} />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup 
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                onOpen={() => setDelited(p._id)}
                anchor="top" >
                  <div className="card">
                        <label>Имя кабеля</label>
                        <p className="place">{p.title}</p>
                        <label>Описание</label>
                        <p className="desc">{p.desc}</p>
                        <label>Номер метки</label>
                        <p className="desc">{p.numb1}</p>
                        <label>Номер метки</label>
                        <p className="desc">{p.numb2}</p>
                        <form onSubmit={deleteSubmit}>
                          <button className="deleteButton">
                            Delete
                          </button>
                        </form>
                        <label>Доп. информация</label>
                        <span className="username">
                          Created by <b>{p.username}</b>
                        </span>
                  </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
          <Popup 
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left" >
            <div>
                <form onSubmit={handleSubmit}>
                  <label>Имя кабеля</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Описание</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Номер метки</label>
                  <textarea
                    placeholder="Enter a number 1."
                    onChange={(e) => setNumb1(e.target.value)}
                  />
                   <label>Номер метки</label>
                  <textarea
                    placeholder="Enter a number 2."
                    onChange={(e) => setNumb2(e.target.value)}
                  />
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
          </Popup>
          </>
        )}
        {newMuft && (
          <>
          <Popup 
            latitude={newMuft.lat}
            longitude={newMuft.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewMuft(null)}
            anchor="left" >
            <div>
                <form onSubmit={handleSubmitMuf}>
                  <label>Имя муфты</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Описание</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Номер муфты</label>
                  <textarea
                    placeholder="Enter a number 1."
                    onChange={(e) => setNumb1(e.target.value)}
                  />
                  <button type="submit" className="submitButton">
                    Добавить муфту
                  </button>
                </form>
              </div>
          </Popup>
          </>
        )}
         <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "red",
              "line-width": 5
            }}
          />
        </Source>
        {currentUsername ? (
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
        )}
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
