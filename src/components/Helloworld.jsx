import React, { useReducer, useState} from 'react';
import Map, { Marker, Popup} from 'react-map-gl';
import { Room} from "@material-ui/icons";
import { Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

const title = [];
const desc = [];
const numb1 = [];
const numb2 = [];

export default React.memo(function Pins({ pins,
  currentUsername,
  setShowWarning,
  setPins }) {

  function reducer(state, action) { 
      switch (action.type) {
      case "username":
        return {currentPlaceId: action._id};
      case "usernamenull":
        return {currentPlaceId: null};
      default:
        throw new Error();
    }
  };

  const [{currentPlaceId}, dispatch] = useReducer(reducer, {currentPlaceId: null});
  const [delited, setDelited] = useState(null);
  //const [currentPlaceId, setCurrentPlaceId] = useState(null);
  console.log("nyan");

  function handleMarkerClick(_id) {
    if (currentUsername !== null) {
      return dispatch({type: "username", _id});
    } else {
      setShowWarning(true)}
  };

  function setCurrentPlaceId() {
    if (currentUsername !== null) {
      return dispatch({type: "usernamenull"});
    } else {
      setShowWarning(true)}
  };

  /*function handleMarkerClick(_id, lat, long)*/

  /*function handleMarkerClick(_id) {
    if (currentUsername !== null) {
      setCurrentPlaceId(_id);
      setViewport({ ...viewport, latitude: lat, longitude: long });
    } else {
      setShowWarning(true)
    }
  };
  */
    
	async function deleteSubmit() {
    const mydelited = {delited};
    try {
      var car = pins.filter(obj => {
        return obj._id !== delited;
      });
      setPins(car);
      setDelited(null);
      await axios.post("/pins/delete", mydelited);
    } catch (err) {
      console.log(err);
    }
  };

  return(
		pins.map(p=>(
          <>
            {<Marker 
              key={p._id}
              latitude={p.lat}
              longitude={p.long}>
              <RadioButtonCheckedOutlinedIcon style={{fontSize:20, color: 
                currentUsername === p.username ? "purple" : "slateblue", cursor: "pointer",}}
              //onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              onClick={() => handleMarkerClick(p._id)} />
            </Marker>}
            {p._id === currentPlaceId && (
              <Popup 
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId()}
                onOpen={() => setDelited(p._id)}
                anchor="top" >
                  <div className="card" key={p._id}>
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
        ))
    );
})

