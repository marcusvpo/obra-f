
import { Photo } from "@/types/project";

interface ProjectLatestPhotoProps {
  photo: Photo;
}

export default function ProjectLatestPhoto({ photo }: ProjectLatestPhotoProps) {
  return (
    <div className="bg-card p-5 rounded-lg h-full">
      <h2 className="text-lg font-semibold mb-3">Última Foto</h2>
      <div className="flex justify-center">
        <img 
          src={photo.url} 
          alt="Última foto do projeto" 
          className="max-h-[250px] rounded-md object-contain"
        />
      </div>
      <p className="text-center text-sm text-gray-400 mt-2">{photo.caption} - {photo.date}</p>
    </div>
  );
}
