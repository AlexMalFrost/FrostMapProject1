import React, { useReducer, useState} from 'react';
import Map, { Marker, Popup} from 'react-map-gl';
import { Room} from "@material-ui/icons";
import { Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import PlayForWorkOutlinedIcon from '@mui/icons-material/PlayForWorkOutlined';

const title = [];
const desc = [];
const numb1 = [];

export default React.memo(function Mufts({ mufts,
  setShowWarning,
  currentUsername,
  setMufts }) {
  console.log('nyan 2 nyan');

  const [delited, setDelited] = useState(null);
  //const [currentPlaceId, setCurrentPlaceId] = useState(null);

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

  /*function handleMarkerClick(_id, lat, long) {
    if (currentUsername !== null) {
      setCurrentPlaceId(_id);
      setViewport({ ...viewport, latitude: lat, longitude: long });
    } else {
      setShowWarning(true)
    }
  };*/
  
  async function mufDeleteSubmit() {
    const mydelited = {delited};
    try {
      var car = mufts.filter( obj => {
        return obj._id !== delited;
      });
      setMufts(car);
      setDelited(null);
      await axios.post("/muftas/delete", mydelited);
    } catch (err) {
      console.log(err);
    }
  };

	return(
		mufts ? mufts.map(p=>(
          <>
            {<Marker 
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10} >
              <PlayForWorkOutlinedIcon style={{fontSize:25, color: "blue", cursor: "pointer",}}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)} />
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
        )
    ) : null
  );
})

