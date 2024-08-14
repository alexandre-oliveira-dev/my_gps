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

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDNLaY6OJ3rHnHY2pl0-3Wci3B-UzVCMKY",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setLocal({lat: latitude, long: longitude});
    });
    return () => {};
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const handleMapLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(local.lat, local.long));
    bounds.extend(new window.google.maps.LatLng(-23.5522944, -46.6637558));

    map.fitBounds(bounds);
  };

  // const icon = "https://img.icons8.com/fluency/48/gps-device.png";
  return (
    <>
      <h1>lat :{local?.lat}</h1>
      <h1>long: {local?.long}</h1>
      {isLoaded && local && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: local.lat, lng: local.long}}
          clickableIcons={true}
          onLoad={map => handleMapLoad(map)}
          zoom={16}
          options={{
            scaleControl: true,
            rotateControl: true,
            mapTypeControl: true,
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
