
import { Photo } from "@/types/project";
import { motion } from "framer-motion";

interface ProjectLatestPhotoProps {
  photo: Photo;
}

export default function ProjectLatestPhoto({ photo }: ProjectLatestPhotoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-4 rounded-lg h-full shadow-md hover:shadow-lg transition-all duration-300 border border-[#444444] overflow-hidden group"
    >
      <h2 className="text-base font-semibold mb-2 flex items-center">
        <span className="text-primary mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </span>
        Última Foto
      </h2>
      <div className="flex justify-center overflow-hidden rounded-md">
        <motion.img 
          src={photo.url} 
          alt="Última foto do projeto" 
          className="max-h-[180px] rounded-md object-contain group-hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">{photo.caption} - {photo.date}</p>
    </motion.div>
  );
}
