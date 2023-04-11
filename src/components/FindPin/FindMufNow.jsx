import { useState } from 'react';
import "./FindMufNow.css";
import { Cancel } from "@material-ui/icons";



export default function FindMufNow({ newMuf, 
  setNewMuf,
  mufts,
  setCurrentPlace,
  setViewport }) {

  const [title, setTitle] = useState(null);
  const [numb1, setNumb1] = useState(null);

  function handleSubmit(e) {
    try {
      const selected = Object.values(mufts).find(e => e.title === title && e.numb1 === numb1);
      const selectedid = selected._id;
      if (selected) {
        setNewMuf(false);
        console.log('yes-yes');
        setCurrentPlace(selectedid);
        setViewport({ latitude: selected.lat, longitude: selected.long });
      } else {
        setNewMuf(false);
        console.log('nonno');
      }
    } catch (err) {
      console.log(err);
    }
  };
    
	return(newMuf ?
            <div className="registerContainer">
                <form onSubmit={handleSubmit} id="form2">
                  <label>Имя муфты</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Номер метки</label>
                  <input
                    type="number"
                    placeholder="Enter a number 1"
                    onChange={(e) => setNumb1(e.target.valueAsNumber)}
                  />
                </form>
                <button type="submit" form="form2" className="submitButton">
                    Найти метку
                </button>
                <Cancel 
                  className="registerCancel"
                  onClick={() => setNewMuf(false)} />
              </div> : null
    );
}

