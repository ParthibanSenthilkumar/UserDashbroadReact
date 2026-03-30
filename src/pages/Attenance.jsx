import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Attenance = () => {
  const position = [51.505, -0.09];
  return (
    <>
      <MapContainer center={position} zoom={13} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position}>
          <Popup>My Location 📍</Popup>
        </Marker>
      </MapContainer>
      ,
    </>
  );
};

export default Attenance;
