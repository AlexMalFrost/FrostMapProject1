import { Source, Layer } from "react-map-gl";
import { useReducer, useEffect} from "react";

const groupArray = require('group-array');

export default function PolylineLayer({ pins, fiterPins }) {

  function reducer(state, action) {
    switch (action.type) {
      case "allcables":
        return {...state, filterPins: pins};
      case "selectedcable": 
        return {...state, filterPins: pins.filter(items => {return items.title === fiterPins;})};
      default:
        throw new Error();
    }
  };
  
  const [{filterPins}, dispatch] = useReducer(reducer, {filterPins: null} );
  
  console.log(filterPins);
  console.log('hahahahah');

  useEffect(() => {
    if (fiterPins === 'все кабеля') {
      return dispatch({type: "allcables"});
    } 
    return dispatch({type: "selectedcable"});
  }, [fiterPins, pins]);

  function MyPipe() {

    return (Object.values(groupArray(filterPins, 'title', 'numb2'))).reduce(function (r, o) {
        Object.keys(o).forEach(function (k) {
            r.push(o[k]);
        });
        return r;
    }, []);
  };

  const dataOneTwo = () => {
    const dataOne = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiLineString",
        coordinates: MyPipe().map(function(array, index) { return array.map(t=>([t.long, t.lat]));}),
      },
    };
    return dataOne;
  }

  return (
    <Source id="polylineLayer" type="geojson" data={dataOneTwo()}>
      <Layer
        id="lineLayer"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round"
        }}
        paint={{
          "line-color": "red",
          "line-width": 6
        }} />
    </Source>
  );
}
