"use client";
import GoogleMapReact from "google-map-react";
import styles from "./LocationMap.module.scss";

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const LocationMap = () => {
  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDH6mxHNVYmWx6IX00NaZJgU4fKHvF9D-0",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
};

export default LocationMap;
