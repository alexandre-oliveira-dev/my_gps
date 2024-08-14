import {useEffect, useState} from "react";
import "./App.css";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
// import mor from "./assets/mor.png";

export default function App() {
  const [local, setLocal] = useState<{
    lat: number;
    long: number;
  }>();

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDNLaY6OJ3rHnHY2pl0-3Wci3B-UzVCMKY",
  });
  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      setLocal({lat: latitude, long: longitude});
    });
    return () => navigator.geolocation.clearWatch(watcher);
  }, [local]);

  if (!isLoaded) return <div>Loading...</div>;

  const icon = "https://img.icons8.com/fluency/48/gps-device.png";
  return (
    <>
      <h1>lat :{local?.lat}</h1>
      <h1>long: {local?.long}</h1>
      {isLoaded && local && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: local.lat, lng: local.long}}
          zoom={18}
          clickableIcons={false}
        >
          {isLoaded && local && (
            <Marker
              icon={{
                url: icon,
                scaledSize: new window.google.maps.Size(50, 50),
                anchor: new window.google.maps.Point(25, 50),
              }}
              position={{lat: local.lat, lng: local.long}}
            ></Marker>
          )}
        </GoogleMap>
      )}
    </>
  );
}
