
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { projectDetails } from "@/data/mockData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import L from "leaflet";

const MapView = () => {
  // Fix Leaflet icon issue in webpack/vite
  useEffect(() => {
    // Fix Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);
  
  // Criar um array com os projetos que têm coordenadas de localização
  const projectsWithLocation = Object.values(projectDetails).filter(
    (project) => project.latitude && project.longitude
  );

  // Calcular o centro do mapa baseado nos projetos disponíveis
  const defaultCenter = projectsWithLocation.length > 0
    ? [projectsWithLocation[0].latitude || -23.5505, projectsWithLocation[0].longitude || -46.6333]
    : [-23.5505, -46.6333]; // Default: São Paulo

  // Criar um ícone customizado para os marcadores
  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <AppLayout title="Mapa de Projetos">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-card border-none shadow p-0 h-[calc(100vh-10rem)]">
          <MapContainer
            center={[defaultCenter[0], defaultCenter[1]]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
          >
            {/* Use OpenStreetMap with dark theme */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Add markers for each project with location */}
            {projectsWithLocation.map((project) => (
              <Marker 
                key={project.id}
                position={[project.latitude || 0, project.longitude || 0]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h3 className="font-medium text-lg">{project.name}</h3>
                    <p className="text-sm">Status: {project.status}</p>
                    <p className="text-sm">Progresso: {project.progress}%</p>
                    <div className="mt-2">
                      <Link 
                        to={`/projeto/${project.id}`}
                        className="text-primary underline text-sm"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MapView;
