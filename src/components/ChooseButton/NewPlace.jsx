import { useState } from 'react';
import { Popup} from 'react-map-gl';
import axios from 'axios';


export default function NewPlace({ newPlace, 
  setNewPlace, 
  setPins,
  pins,
  currentUsername
	 }) {

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [numb1, setNumb1] = useState(null);
  const [numb2, setNumb2] = useState(null);

  function selectFewerProps(show){
      const {username, _id, title, desc, numb1, numb2, lat, long} = show;
      return {username, _id, title, desc, numb1, numb2, lat, long};
    };

  const newEpisodes = pins.map(selectFewerProps);

  async function handleSubmit(e) {
    const newPin = {
      username: currentUsername,
      _id: Date.now()/1000,
      title,
      desc,
      numb1,
      numb2,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    const MyNewPin = [newPin];
    try {
      const selected = Object.values(pins).find(e => e.title === title && e.numb1 === numb1 && e.numb2 === numb2);
      if (selected) {
        setPins(MyNewPin.concat(newEpisodes));
        setNewPlace(null);
        console.log('hi');
        await axios.post("/pins/update", newPin);
      } else {
        setPins(MyNewPin.concat(newEpisodes));
        setNewPlace(null);
        console.log('bye-bye');
        await axios.post("/pins", newPin);
      }
    } catch (err) {
      console.log(err);
    }
  };
    
	return(newPlace && (
          <Popup 
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left" >
            <div>
                <form onSubmit={handleSubmit} id="form2">
                  <label>Номер кабеля</label>
                  <input
                    type="number"
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
                  <input
                    type="number"
                    placeholder="Enter a number 1"
                    onChange={(e) => setNumb1(e.target.valueAsNumber)}
                  />
                   <label>Номер промежутка</label>
                   <input
                    type="number"
                    placeholder="Enter a number 2"
                    onChange={(e) => setNumb2(e.target.valueAsNumber)}
                  />
                </form>
                <button type="submit" form="form2" className="submitButton">
                    Add Pin
                </button>
              </div>
          </Popup>
        )
    );
}

