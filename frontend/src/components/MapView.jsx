import React from 'react';
import {MapContainer,TileLayer,Polyline} from 'react-leaflet';
export function MapView({route}) {
  if(!Array.isArray(route)||route.length===0)return null;
  return <MapContainer center={route[0]} zoom={13} style={{height:'100%',width:'100%'}}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <Polyline positions={route}/>
  </MapContainer>;
}
