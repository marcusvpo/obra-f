
import { Photo } from "@/types/project";

interface ProjectLatestPhotoProps {
  photo: Photo;
}

export default function ProjectLatestPhoto({ photo }: ProjectLatestPhotoProps) {
  return (
    <div className="bg-card p-4 rounded-lg h-full">
      <h2 className="text-base font-semibold mb-2">Última Foto</h2>
      <div className="flex justify-center">
        <img 
          src={photo.url} 
          alt="Última foto do projeto" 
          className="max-h-[180px] rounded-md object-contain"
        />
      </div>
      <p className="text-center text-xs text-gray-400 mt-1">{photo.caption} - {photo.date}</p>
    </div>
  );
}
