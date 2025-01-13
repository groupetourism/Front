import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { Overlay } from "ol";
import { defaults as defaultControls, Zoom } from "ol/control";
import "ol/ol.css";
import { fetchSites, SiteData } from "../../api/Sites"; // Import the fetchSites function and SiteData interface

const OLMapContainer: React.FC = () => {
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [sites, setSites] = useState<SiteData[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<Overlay | null>(null);

  useEffect(() => {
    const loadSites = async () => {
      const response = await fetchSites();
      if (response.data) {
        setSites(response.data);
        const uniqueDepartments = Array.from(
          new Set(response.data.map((site: SiteData) => site.department?.name).filter(Boolean))
        ) as string[];
        setDepartments(uniqueDepartments);
      } else {
        console.error("Error fetching sites:", response.error);
      }
    };
    loadSites();
  }, []);

  useEffect(() => {
    if (!mapRef.current || sites.length === 0) return;

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation([10.1815, 36.8065]); // Fallback to default center (Tunis)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation([10.1815, 36.8065]); // Fallback to default center (Tunis)
    }
  }, [sites]);

  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(userLocation),
        zoom: 13,
      }),
      controls: defaultControls().extend([new Zoom()]), // Add zoom controls
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    const filteredSites =
      activeDepartment === "all"
        ? sites
        : sites.filter((site) => site.department?.name === activeDepartment);

    filteredSites.forEach((site: SiteData) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([site.longitude, site.latitude])),
        name: site.name,
        department: site.department?.name || "Unknown",
        site: site,
      });

      const markerStyle = new Style({
        image: new Icon({
          src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          scale: 1.5,
          anchor: [0.5, 1],
        }),
      });

      marker.setStyle(markerStyle);
      vectorSource.addFeature(marker);
    });

    // Create popup overlay
    const popupElement = document.createElement("div");
    popupElement.className = "ol-popup";

    const popup = new Overlay({
      element: popupElement,
      autoPan: true,
    });
    map.addOverlay(popup);
    popupRef.current = popup;

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates();
        const site = feature.get("site");

        const content = `<div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                          <strong style="font-size: 16px;">${site.name}</strong><br>
                          <span style="font-size: 14px; color: #666;">Department: ${site.department?.name || "Unknown"}</span>
                        </div>`;
        popupElement.innerHTML = content;
        popup.setPosition(coordinates);

        // Smooth auto-pan to the marker
        const view = map.getView();
        const duration = 500; // Animation duration in milliseconds
        view.animate({
          center: coordinates,
          duration,
        });

        setSelectedSite(site);
      } else {
        popup.setPosition(undefined);
      }
    });

    return () => map.setTarget(undefined);
  }, [activeDepartment, sites, userLocation]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full h-full p-4 lg:p-8 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Sidebar</h2>
          {selectedSite ? (
            <div className="space-y-2">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-700">
                  <strong>Name:</strong> {selectedSite.name}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  <strong>Department:</strong> {selectedSite.department?.name || "Unknown"}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  <strong>Description:</strong> {selectedSite.description || "N/A"}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  <strong>Visiting Period:</strong> {selectedSite.visite_periode || "N/A"}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  <strong>Access Means:</strong> {selectedSite.access_means || "N/A"}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  <strong>Ticket Price:</strong> {selectedSite.ticket_price ? `$${selectedSite.ticket_price.toFixed(2)}` : "Free"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Click on a marker to see details.</p>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Icon Bar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6">
            <ul className="flex justify-start space-x-4">
              <li
                key="all"
                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition duration-300 ${
                  activeDepartment === "all"
                    ? "bg-orange-100 text-orange-500"
                    : "hover:bg-orange-50 text-slate-700"
                }`}
                onClick={() => setActiveDepartment("all")}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <FaGlobe className="text-orange-500" />
                </div>
                <span className="mt-1 text-sm font-medium">All</span>
              </li>

              {departments.map((department) => (
                <li
                  key={department}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition duration-300 ${
                    activeDepartment === department
                      ? "bg-orange-100 text-orange-500"
                      : "hover:bg-orange-50 text-slate-700"
                  }`}
                  onClick={() => setActiveDepartment(department)}
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    <FaMapMarkerAlt className="text-orange-500" />
                  </div>
                  <span className="mt-1 text-sm font-medium">{department}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Map</h2>
            <div
              ref={mapRef}
              className="w-full h-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OLMapContainer;