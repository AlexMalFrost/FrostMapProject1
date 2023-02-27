import { Source, Layer } from "react-map-gl";


export default function PolylineLayer({ pins }) {
  const groupArray = require('group-array');
  function MyPipe() {

    return (Object.values(groupArray(pins, 'title', 'numb2'))).reduce(function (r, o) {
        Object.keys(o).forEach(function (k) {
            r.push(o[k]);
        });
        return r;
    }, []);
  };


  const resultt = MyPipe().map(function(array, index) { 
    return array.map(t=>([t.long, t.lat]));
  });

  function dataOneTwo() {
    const dataOne = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiLineString",
        coordinates: resultt,
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
          "line-width": 5
        }} />
    </Source>
  );
}