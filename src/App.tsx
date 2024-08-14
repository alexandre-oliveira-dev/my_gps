import {useEffect, useState} from "react";
import "./App.css";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

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
    navigator.geolocation.getCurrentPosition(position => {
      setLocal({
        lat: position?.coords?.latitude,
        long: position?.coords?.longitude,
      });
    });
    //  console.log(local);
  }, [local]);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <h1>lat :{local?.lat}</h1>
      <h1>long: {local?.long}</h1>
      {isLoaded && local && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: local.lat, lng: local.long}}
          zoom={15}
        >
          {local && (
            <Marker
              icon={{url: "https://img.icons8.com/fluency/48/gps-device.png"}}
              position={{lat: local.lat, lng: local.long}}
            ></Marker>
          )}
        </GoogleMap>
      )}
    </>
  );
}
