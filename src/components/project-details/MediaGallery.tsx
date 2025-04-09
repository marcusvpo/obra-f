
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
import { updateObservations } from "@/data/mockData";
import { Photo } from "@/types/project";

interface MediaGalleryProps {
  projectId: string;
  photos?: Photo[];
  observations?: string;
  onObservationsUpdated: (observations: string) => void;
}

interface ObservationsFormData {
  observations: string;
}

export default function MediaGallery({ 
  projectId, 
  photos, 
  observations,
  onObservationsUpdated
}: MediaGalleryProps) {
  const [observationsDialogOpen, setObservationsDialogOpen] = useState(false);
  
  const observationsForm = useForm<ObservationsFormData>({
    defaultValues: {
      observations: observations || ""
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Galeria de Fotos</h2>
          </div>
          <div className="bg-card p-5 rounded-lg">
            {photos && photos.length > 0 ? (
              <PhotoGallery images={photos} />
            ) : (
              <p className="text-muted text-center py-4">Nenhuma foto disponível</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Observações</h2>
            <Button 
              variant="outline" 
              onClick={() => setObservationsDialogOpen(true)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Edit size={14} className="mr-2" />
              Editar
            </Button>
          </div>
          <div className="bg-card p-5 rounded-lg h-[calc(100%-48px)]">
            {observations ? (
              <p className="whitespace-pre-wrap">{observations}</p>
            ) : (
              <p className="text-muted text-center py-4">Nenhuma observação disponível.</p>
            )}
          </div>
        </div>
      </div>
      
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
              
              <DialogFooter>
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
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
