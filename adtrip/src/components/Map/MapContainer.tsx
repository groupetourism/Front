import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import "ol/ol.css";

interface MapContainerProps {
  tours: {
    latitude: string;
    longitude: string;
    name: string;
  }[];
}

const MapContainer: React.FC<MapContainerProps> = ({ tours }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || tours.length === 0) return;

    // Convert latitude and longitude to OpenLayers coordinates
    const center = fromLonLat([
      parseFloat(tours[0].longitude),
      parseFloat(tours[0].latitude),
    ]);

    // Create a vector source for markers
    const vectorSource = new VectorSource();

    // Add markers for each tour
    tours.forEach((tour) => {
      const marker = new Feature({
        geometry: new Point(
          fromLonLat([parseFloat(tour.longitude), parseFloat(tour.latitude)])
        ),
        name: tour.name,
      });

      // Style the marker
      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            scale: 1.5,
            anchor: [0.5, 1],
          }),
        })
      );

      vectorSource.addFeature(marker);
    });

    // Create a vector layer for the markers
    const vectorLayer = new VectorLayer({
      source: vectorSource,
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
        zoom: 10,
      }),
    });

    // Cleanup on unmount
    return () => map.setTarget(undefined);
  }, [tours]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    />
  );
};

export default MapContainer;