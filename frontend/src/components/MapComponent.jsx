import {useEffect,useState} from "react";
import {MapContainer,TileLayer,Marker,Popup,Polyline} from "react-leaflet";
import {io} from "socket.io-client";
import L from "leaflet";

const socket=io("http://localhost:5000");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

export default function MapComponent(){

const[position,setPosition]=useState([23.3441,85.3096]);

const destination=[23.3702,85.325];

useEffect(()=>{

const watchId=navigator.geolocation.watchPosition((pos)=>{

const loc=[

pos.coords.latitude,

pos.coords.longitude

];

setPosition(loc);

socket.emit("driver-location",{

ambulanceNo:"MH12AB4567",

lat:loc[0],

lng:loc[1],

speed:pos.coords.speed||0,

heading:pos.coords.heading||0

});

});

return()=>navigator.geolocation.clearWatch(watchId);

},[]);

return(

<MapContainer center={position} zoom={14} style={{height:"100%",width:"100%"}}>

<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

<Marker position={position}>

<Popup>Ambulance</Popup>

</Marker>

<Marker position={destination}>

<Popup>City Hospital</Popup>

</Marker>

<Polyline positions={[position,destination]} color="red"/>

</MapContainer>

);

}