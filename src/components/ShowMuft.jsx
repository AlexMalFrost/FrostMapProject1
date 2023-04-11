import React, { useState} from 'react';
import { Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';


export default function ShowMuft({ mufts,
  setMufts,
  currentPlace,
  setCurrentPlace }) {
  console.log('muf 2 muf');

  const [delited, setDelited] = useState(null);

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

	return(mufts?.map(p=>(
    p._id === currentPlace && 
      <Popup 
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setCurrentPlace(null)}
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
    )));
  }

