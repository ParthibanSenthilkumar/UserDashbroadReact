import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { createAttendance } from "../Services/Api";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Attenance = () => {
  let [position, setposition] = useState(null);

  const location = async () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      setposition([lat, long]);
      console.log(lat, long);
    });
  };
  if (position) {
    const time = new Date().toISOString();
    createAttendance({
      latitude: position[0],
      longitude: position[1],
      Logintime: time,
    });
    console.log(position, "position");
  }

  return (
    <>
      <button onClick={location}> Attendance </button>
      {position && (
        <div style={{ height: "300px", width: "100%" }}>
          <MapContainer
            center={position || [11.0133, 76.9944]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={position}>
              <Popup>My Location </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default Attenance;
