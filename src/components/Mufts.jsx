import React, { useEffect, useState} from 'react';
import Map, { Marker, Popup} from 'react-map-gl';
import { Room} from "@material-ui/icons";
import { Source, Layer } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';


export default function Mufts({ mufts,
  currentPlaceId,
  viewport,
  setViewport,
  setShowWarning,
  currentUsername,
  setCurrentPlaceId,
  setMufts }) {

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [numb1, setNumb1] = useState(null);
  const [delited, setDelited] = useState(null);

  function handleMarkerClick(_id, lat, long) {
    if (currentUsername !== null) {
      setCurrentPlaceId(_id);
      setViewport({ ...viewport, latitude: lat, longitude: long });
    } else {
      setShowWarning(true)
    }
  };
  
  const mufDeleteSubmit = async () => {
    const mydelited = {delited};
    try {
      var car = mufts.filter(function( obj ) {
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
		mufts.map(p=>(
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
        )
    )
  );
}

