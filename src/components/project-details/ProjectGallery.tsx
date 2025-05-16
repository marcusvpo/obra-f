
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Images } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateObservations } from "@/data/projectData";
import { GalleryImage } from "@/types/project";
import PhotoGallery from "@/components/dashboard/PhotoGallery";

export interface ProjectGalleryProps {
  projectId: string;
  photos?: GalleryImage[];
  observations?: string;
  limit?: number;
  showViewAllButton?: boolean;
  onObservationsUpdated: (observations: string) => void;
}

interface ObservationsFormData {
  observations: string;
}

export default function ProjectGallery({ 
  projectId, 
  photos = [], 
  observations = "",
  limit = 0,
  showViewAllButton = false,
  onObservationsUpdated 
}: ProjectGalleryProps) {
  const [observationsDialogOpen, setObservationsDialogOpen] = useState(false);
  const [fullGalleryOpen, setFullGalleryOpen] = useState(false);
  
  const displayPhotos = limit > 0 ? photos.slice(0, limit) : photos;
  
  const observationsForm = useForm<ObservationsFormData>({
    defaultValues: {
      observations: observations
    }
  });
  
  const onObservationsSubmit = (data: ObservationsFormData) => {
    updateObservations(projectId, data.observations);
    setObservationsDialogOpen(false);
    
    onObservationsUpdated(data.observations);
    
    toast.success("Observações atualizadas com sucesso!");
  };
  
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Galeria de Fotos</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setObservationsDialogOpen(true)}
              className="text-sm"
            >
              <Edit size={14} className="mr-2" />
              Observações
            </Button>
            
            {showViewAllButton && photos.length > limit && (
              <Button 
                variant="outline" 
                onClick={() => setFullGalleryOpen(true)}
                className="text-sm"
              >
                <Images size={14} className="mr-2" />
                Ver Todas
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {displayPhotos.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {displayPhotos.map(photo => (
                  <div 
                    key={photo.id} 
                    className="aspect-square rounded-lg overflow-hidden bg-secondary cursor-pointer"
                    onClick={() => setFullGalleryOpen(true)}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-border pt-4">
                <h3 className="font-medium mb-2">Observações</h3>
                {observations ? (
                  <p className="text-sm text-muted-foreground line-clamp-3">{observations}</p>
                ) : (
                  <p className="text-sm text-muted">Nenhuma observação registrada</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Images className="h-12 w-12 text-muted mb-4" />
              <p className="text-muted text-center">Nenhuma foto disponível</p>
              
              <div className="mt-6 border-t border-border w-full pt-4">
                <h3 className="font-medium mb-2">Observações</h3>
                {observations ? (
                  <p className="text-sm text-muted-foreground">{observations}</p>
                ) : (
                  <p className="text-sm text-muted">Nenhuma observação registrada</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={observationsDialogOpen} onOpenChange={setObservationsDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Editar Observações</DialogTitle>
          </DialogHeader>
          
          <Form {...observationsForm}>
            <form onSubmit={observationsForm.handleSubmit(onObservationsSubmit)} className="space-y-4">
              <FormField
                control={observationsForm.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Adicione observações sobre o projeto" 
                        className="bg-secondary resize-none min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setObservationsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={fullGalleryOpen} onOpenChange={setFullGalleryOpen} className="max-w-5xl">
        <DialogContent className="bg-background border-border max-w-5xl">
          <DialogHeader>
            <DialogTitle>Galeria de Fotos</DialogTitle>
          </DialogHeader>
          
          {photos.length > 0 ? (
            <PhotoGallery images={photos} />
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted">Nenhuma foto disponível</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
