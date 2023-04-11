import React from 'react';
import { Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PlayForWorkOutlinedIcon from '@mui/icons-material/PlayForWorkOutlined';

export default React.memo(function Mufts({ mufts,
  setShowWarning,
  currentUsername,
  setMufts,
  setCurrentPlace }) {
  console.log('nyan 2 nyan');

  function handleMarkerClick(_id) {
    if (currentUsername !== null) {
      setCurrentPlace(_id);
    } else {
      setShowWarning(true)}
  };

	return( mufts?.map(p=>(
            <Marker 
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10} >
              <PlayForWorkOutlinedIcon style={{fontSize:25, color: "blue", cursor: "pointer",}}
              onClick={() => handleMarkerClick(p._id)} />
            </Marker>
        )
    )
  );
})

