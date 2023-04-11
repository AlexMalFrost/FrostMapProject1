import React from 'react';
import { Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

export default React.memo(function Pins({ pins,
  currentUsername,
  setShowWarning,
  setPins,
  setCurrentPlace }) {

  console.log("nyan");

  function handleMarkerClick(_id) {
    if (currentUsername !== null) {
      setCurrentPlace(_id);
    } else {
      setShowWarning(true)}
  };

  return(
		pins.map(p=>(
            <Marker 
              key={p._id}
              latitude={p.lat}
              longitude={p.long}>
              <RadioButtonCheckedOutlinedIcon style={{fontSize:20, color: 
                currentUsername === p.username ? "purple" : "slateblue", cursor: "pointer",}}
              onClick={() => handleMarkerClick(p._id)} />
            </Marker>
        ))
    );
})

