import React, { useState } from 'react';
import { TripForm } from './components/TripForm';
import { MapView } from './components/MapView';
import { geocode } from './services/geo';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrip = async (form) => {
    setLoading(true);
    try {
      const res1 = await fetch(`${process.env.REACT_APP_API_URL}/api/trips/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      const trip = await res1.json();
      const res2 = await fetch(`${process.env.REACT_APP_API_URL}/api/trips/${trip.id}/log/`);
      const log = await res2.json();
      const [lat0, lon0] = await geocode(form.current_location);
      const [lat1, lon1] = await geocode(form.pickup);
      const [lat2, lon2] = await geocode(form.dropoff);
      const res3 = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Accept':'application/json, application/geo+json',
            Authorization: process.env.REACT_APP_ORS_API_KEY,
          },
          body: JSON.stringify({coordinates:[[lon0,lat0],[lon1,lat1],[lon2,lat2]]}),
        }
      );
      if(!res3.ok) throw new Error('Routing error');
      const geo = await res3.json();
      const route = geo.features[0].geometry.coordinates.map(c=>[c[1],c[0]]);
      setData({trip,log,route});
    } catch(e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return <div style={{padding:10}}>
    <TripForm onSubmitForm={handleTrip}/>
    {loading && <p>Loading…</p>}
    {data && <>
      <div><strong>Trip:</strong> {data.trip.current_location} → {data.trip.pickup} → {data.trip.dropoff}</div>
      <div style={{height:400,margin:'10px 0'}}><MapView route={data.route}/></div>
      <pre>{JSON.stringify(data.log.grid,null,2)}</pre>
    </>}
  </div>;
}

export default App;
