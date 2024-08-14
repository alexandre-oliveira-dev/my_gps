import {useEffect, useState} from "react";
import "./App.css";

export default function App() {
  const [local, setLocal] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      setLocal({
        lat: position?.coords?.latitude,
        long: position?.coords?.longitude,
      });
    });
    console.log(local);
  }, [local]);
  return (
    <>
      <h1>lat :{local?.lat}</h1>
      <h1>long: {local?.long}</h1>
    </>
  );
}
