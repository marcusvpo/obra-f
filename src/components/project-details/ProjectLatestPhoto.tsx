
import { Photo } from "@/types/project";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface ProjectLatestPhotoProps {
  photo: Photo;
}

export default function ProjectLatestPhoto({ photo }: ProjectLatestPhotoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-[#444444] overflow-hidden group cursor-pointer"
    >
      <h2 className="text-base font-semibold mb-2 flex items-center">
        <Camera size={18} className="text-primary mr-2" />
        Última Foto
      </h2>
      <div className="flex justify-center overflow-hidden rounded-md">
        <motion.img 
          src={photo.url} 
          alt="Última foto do projeto" 
          className="h-[180px] rounded-md object-cover group-hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">{photo.caption} - {photo.date}</p>
    </motion.div>
  );
}
