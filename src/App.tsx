import {useEffect, useState} from "react";
import "./App.css";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import mor from "./assets/mor.png";
import eu from "./assets/eu.png";

export default function App() {
  const [local, setLocal] = useState<{
    lat: number;
    long: number;
  }>({
    lat: -23.619379,
    long: -46.424244,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
  });

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(local.lat, local.long));
      bounds.extend(new window.google.maps.LatLng(-23.5977873, -46.4789993));

      map.fitBounds(bounds);
    }
  }, [map, local.lat, local.long]);

  
    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      setLocal({lat: latitude, long: longitude});
      console.log(local)
    });
  

  if (!isLoaded) return <div>Loading...</div>;

  // const icon = "https://img.icons8.com/fluency/48/gps-device.png";
  return (
    <>
      <h1>lat :{local?.lat}</h1>
      <h1 style={{color:'green'}}>long: {local?.long}</h1>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: local.lat, lng: local.long}}
          clickableIcons={true}
          onLoad={map => setMap(map)}
          options={{
            scaleControl: true,
            rotateControl: true,
          }}
        >
          {local.lat && local.long && (
            <>
              <Marker
                icon={{
                  url: eu,
                  scaledSize: new window.google.maps.Size(70, 70),
                  anchor: new window.google.maps.Point(25, 50),
                }}
                position={{lat: -23.5977873, lng: -46.4789993}}
              ></Marker>
              <Marker
                icon={{
                  url: mor,
                  scaledSize: new window.google.maps.Size(70, 70),
                }}
                position={{lat: local.lat, lng: local.long}}
              ></Marker>
            </>
          )}
        </GoogleMap>
      )}
    </>
  );
}
