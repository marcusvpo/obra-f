
import { Photo } from "@/types/project";

interface ProjectLatestPhotoProps {
  photo: Photo;
}

export default function ProjectLatestPhoto({ photo }: ProjectLatestPhotoProps) {
  return (
    <div className="bg-card p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Última Foto do Projeto</h2>
      <div className="flex justify-center">
        <img 
          src={photo.url} 
          alt="Última foto do projeto" 
          className="max-h-[400px] rounded-md object-contain"
        />
      </div>
    </div>
  );
}
