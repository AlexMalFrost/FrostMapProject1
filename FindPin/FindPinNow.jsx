import { useState } from 'react';
import "./FindPinNow.css";
import { Cancel } from "@material-ui/icons";

export default function FindPinNow({ newPinPlace, 
  setNewPinPlace,
  pins,
  setCurrentPlace,
  setViewport}) {

  const [title, setTitle] = useState(null);
  const [numb1, setNumb1] = useState(null);
  const [numb2, setNumb2] = useState(null);

  function handleSubmit(e) {
    try {
      const selected = Object.values(pins).find(e => e.title === title && e.numb1 === numb1 && e.numb2 === numb2);
      const selectedid = selected._id;
      if (selected) {
        setNewPinPlace(false);
        console.log('yes yes');
        setCurrentPlace(selectedid);
        setViewport({ latitude: selected.lat, longitude: selected.long });
      } else {
        setNewPinPlace(false);
        console.log('no-no-no');
      }
    } catch (err) {
      console.log(err);
    }
  };
    
	return( newPinPlace ?
            <div className="registerContainer">
                <form onSubmit={handleSubmit} id="form2">
                  <label>Номер кабеля</label>
                  <input
                    type="number"
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
                   <label>Номер промежутка</label>
                   <input
                    type="number"
                    placeholder="Enter a number 2"
                    onChange={(e) => setNumb2(e.target.valueAsNumber)}
                  />
                </form>
                <button type="submit" form="form2" className="submitButton">
                    Найти метку
                </button>
                <Cancel 
                  className="registerCancel"
                  onClick={() => setNewPinPlace(false)} />
              </div> : null
        );
}

