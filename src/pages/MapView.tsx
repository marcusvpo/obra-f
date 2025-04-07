
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
  
  // Create an array with projects that have location coordinates
  const projectsWithLocation = Object.values(projectDetails).filter(
    (project) => project.latitude && project.longitude
  );

  return (
    <AppLayout title="Mapa de Projetos">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-card border-none shadow p-0 h-[calc(100vh-10rem)]">
          <MapContainer 
            center={[-23.5505, -46.6333]} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {projectsWithLocation.map((project) => (
              <Marker 
                key={project.id}
                position={[
                  project.latitude || -23.5505,
                  project.longitude || -46.6333
                ]}
              >
                <Popup>
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
