import React, { useState } from "react";
import { FaCoffee, FaCross, FaUmbrellaBeach, FaMapMarkerAlt, FaEllipsisH, FaGlobe } from "react-icons/fa";

const MapContainer: React.FC = () => {
  // Section 1: États et Données
  // ------------------------------------------------
  // Ici, on définit l'état pour l'élément actif du menu.
  const [activeItem, setActiveItem] = useState("all"); // "all" pour afficher tous les éléments sur la carte.

  // Les éléments du menu avec leurs icônes et labels.
  const menuItems = [
    { id: "all", label: "All", icon: <FaGlobe className="text-orange-500" /> }, // Icône pour afficher tous les éléments.
    { id: "cafes", label: "Cafes", icon: <FaCoffee className="text-orange-500" /> },
    { id: "hospitals", label: "Hospitals", icon: <FaCross className="text-orange-500" /> },
    { id: "tourism", label: "Tourism", icon: <FaUmbrellaBeach className="text-orange-500" /> },
    { id: "more", label: "More", icon: <FaEllipsisH className="text-orange-500" /> },
  ];

  // Section 2: Structure de la Page
  // ------------------------------------------------
  return (
    <div className="relative w-full h-auto bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Section 3: Barre d'Icônes et Contenu Principal */}
      <div className="w-full p-4 lg:p-8 flex flex-col lg:flex-row">
        {/* Sidebar (Section 4) */}
        <div className="w-full lg:w-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Sidebar</h2>
          <p className="text-gray-600">Future data will be displayed here.</p>
          {/* Exemple de contenu pour la sidebar */}
          <div className="mt-4 space-y-2">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm font-medium text-slate-700">Data Item 1</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm font-medium text-slate-700">Data Item 2</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm font-medium text-slate-700">Data Item 3</p>
            </div>
          </div>
        </div>

        {/* Contenu Principal (Section 5) */}
        <div className="flex-1">
          {/* Barre d'Icônes (Section 6) */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6">
            <ul className="flex justify-start space-x-4 overflow-x-auto">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition duration-300 ${
                    activeItem === item.id
                      ? "bg-orange-100 text-orange-500"
                      : "hover:bg-orange-50 text-slate-700"
                  }`}
                  onClick={() => setActiveItem(item.id)} // Au clic, on met à jour l'élément actif.
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    {item.icon}
                  </div>
                  <span className="mt-1 text-sm font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conteneur de la Carte (Section 7) */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 h-[400px] lg:h-[600px]">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Map</h2>
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;

// Instructions pour Implémenter les Fonctionnalités
// ------------------------------------------------
// **1. Implémenter la Carte :**
// - Tu dois installer `react-leaflet` et `leaflet` pour ajouter une carte interactive.
// - Remplace le placeholder par un composant `MapContainer` de `react-leaflet`.
// - Tu peux utiliser `TileLayer` pour afficher la carte et `Marker` pour ajouter des points d'intérêt.

// **2. Filtrer les Éléments sur la Carte :**
// - Il faudrait que tu ajoutes un état pour stocker les données des éléments (cafés, hôpitaux, etc.).
// - Lorsqu'un utilisateur clique sur une icône, filtre les données en fonction de l'ID de l'élément sélectionné.
// - Affiche uniquement les marqueurs correspondants sur la carte.

// **3. Utiliser Axios pour Récupérer les Données de l'API :**
// - Tu dois d'abord installer Axios :
//   ```bash
//   npm install axios
//   ```
// - Ensuite, tu peux créer une fonction pour récupérer les données en fonction du type d'icône sélectionné.
// - Par exemple, si l'utilisateur clique sur l'icône "Cafes", tu envoies une requête à l'API pour récupérer uniquement les cafés.
// - Voici un exemple de code pour faire cela :

// ```tsx
// import axios from "axios";

// const fetchData = async (type: string) => {
//   try {
//     const response = await axios.get(`https://ton-api.com/data?type=${type}`);
//     return response.data; // Les données récupérées depuis l'API
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données :", error);
//     return [];
//   }
// };

// // Utilisation dans le composant
// useEffect(() => {
//   const loadData = async () => {
//     const data = await fetchData(activeItem); // `activeItem` est l'ID de l'icône sélectionnée
//     // Mets à jour l'état avec les données récupérées
//   };
//   loadData();
// }, [activeItem]);
// ```

// **4. Icône "All" pour Afficher Tous les Éléments :**
// - L'icône "All" doit réinitialiser le filtre et afficher tous les éléments sur la carte.
// - Tu peux utiliser l'ID "all" pour gérer ce cas.
// - Par exemple, si l'ID est "all", tu récupères toutes les données sans filtre :
//   ```tsx
//   const fetchAllData = async () => {
//     try {
//       const response = await axios.get("https://ton-api.com/data");
//       return response.data; // Toutes les données
//     } catch (error) {
//       console.error("Erreur lors de la récupération des données :", error);
//       return [];
//     }
//   };
//   ```

// **5. Rendre la Page Responsive :**
// - Utilise les classes Tailwind CSS comme `flex-col`, `lg:flex-row`, et `w-full lg:w-64` pour adapter la mise en page aux écrans de toutes tailles.
// - La barre d'icônes doit être scrollable horizontalement sur les petits écrans.
//J'ai utilisee une IA la comme ca "deepseek" pour generer les commentaires en esperant que ca puisse aider sinon courage bro je sais que tu est occupee de l'autre cote en tout cas comme j'ai dit faisons ce qu'on peut 
// @ Ainz