import { useState} from 'react';
import { Popup} from 'react-map-gl';
import axios from 'axios';


export default function NewMuft({ newMuft, 
  setNewMuft,
  currentUsername,
  mufts,
  setMufts
	 }) {

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [numb1, setNumb1] = useState(null);

  console.log('nyan nyan 2');

  async function handleSubmitMuf(e) {
    const newMuf = {
      username: currentUsername,
      _id: Date.now()/1000,
      title,
      desc,
      numb1,
      lat: newMuft.lat,
      long: newMuft.long,
    };
    try {
      const selected = Object.values(mufts).find(e => e.numb1 === numb1);
      if (selected) {
        setMufts([...mufts, newMuf]);
        setNewMuft(null);
        console.log('hi');
        await axios.post("/muftas/update", newMuf);
      } else {
        setMufts([...mufts, newMuf]);
        setNewMuft(null);
        console.log('mufts mufts mufts');
        await axios.post("/muftas", newMuf);
      }
    } catch (err) {
        console.log(err);
      }
  };
    
	return(
    newMuft && (
          <Popup 
            latitude={newMuft.lat}
            longitude={newMuft.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewMuft(null)}
            anchor="left" >
            <div>
                <form onSubmit={handleSubmitMuf} id="form1">
                  <label>Имя муфты</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Описание</label>
                  <textarea
                    placeholder="Say us something about this place"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Номер муфты</label>
                  <input 
                    type="number"
                    placeholder="Enter a number 1"
                    onChange={(e) => setNumb1(e.target.valueAsNumber)}
                  />
                </form>
                <button type="submit" form="form1" className="submitButton">
                    Добавить муфту
                </button>
              </div>
          </Popup>
        )
    );
}

