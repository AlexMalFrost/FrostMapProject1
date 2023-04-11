import React, {  useState} from 'react';
import { Popup } from 'react-map-gl';
import axios from 'axios';

export default function ShowPin({ pins,
  setPins,
  currentPlace,
  setCurrentPlace }) {

  const [delited, setDelited] = useState(null);
  console.log(currentPlace);
  
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
    pins?.map(p=>(
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
        ))
    );
}

