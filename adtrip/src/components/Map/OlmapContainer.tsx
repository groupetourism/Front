import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { Overlay } from "ol";
import "ol/ol.css";

interface MapContainerProps {
  latitude: number;
  longitude: number;
  name: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ latitude, longitude, name }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Function to calculate distance using the Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLon } = position.coords;
          setUserLocation([userLon, userLat]);

          // Calculate distance
          const dist = calculateDistance(userLat, userLon, latitude, longitude);
          setDistance(dist);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Convert latitude and longitude to OpenLayers coordinates
    const center = fromLonLat([longitude, latitude]);

    // Create a marker for the destination
    const destinationMarker = new Feature({
      geometry: new Point(center),
      name: name,
    });

    // Style the destination marker
    const destinationMarkerStyle = new Style({
      image: new Icon({
        src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default Leaflet marker icon
        scale: 1.5,
        anchor: [0.5, 1],
      }),
    });

    destinationMarker.setStyle(destinationMarkerStyle);

    // Create a marker for the user's location
    let userMarker: Feature | null = null;
    if (userLocation) {
      userMarker = new Feature({
        geometry: new Point(fromLonLat(userLocation)),
        name: "Your Location",
      });

      // Style the user marker
      const userMarkerStyle = new Style({
        image: new Icon({
          src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default Leaflet marker icon
          scale: 1.5,
          anchor: [0.5, 1],
          color: "blue", // Customize the color for the user's location
        }),
      });

      userMarker.setStyle(userMarkerStyle);
    }

    // Create a vector layer for the markers
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: userMarker ? [destinationMarker, userMarker] : [destinationMarker],
      }),
    });

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap tile layer
        }),
        vectorLayer, // Add the markers layer
      ],
      view: new View({
        center: center,
        zoom: 13,
      }),
    });

    // Add a popup for the destination marker
    const popup = new Overlay({
      element: document.createElement("div"),
      autoPan: true,
    });
    map.addOverlay(popup);

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const coordinates = toLonLat((feature.getGeometry() as Point).getCoordinates());
        const content = `<div style="padding: 8px; background: white; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                          <strong>${feature.get("name")}</strong><br>
                          ${distance !== null ? `Distance: ${distance.toFixed(2)} km` : ""}
                        </div>`;
        const popupElement = popup.getElement();
        if (popupElement) {
          popupElement.innerHTML = content;
          popup.setPosition((feature.getGeometry() as Point).getCoordinates());
        }
      } else {
        popup.setPosition(undefined);
      }
    });

    // Cleanup on unmount
    return () => map.setTarget(undefined);
  }, [latitude, longitude, name, userLocation, distance]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    />
  );
};

export default MapContainer;