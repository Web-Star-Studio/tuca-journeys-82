
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Upload, Trash2, Download, Eye, FilePlus, Loader2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  previewUrl?: string;
}

const ProfileDocumentsTab = () => {
  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Passaporte.pdf",
      type: "application/pdf",
      uploadDate: "2023-06-15",
      size: "1.2 MB",
      previewUrl: "#"
    },
    {
      id: "2",
      name: "Identidade.jpg",
      type: "image/jpeg",
      uploadDate: "2023-01-10",
      size: "850 KB",
      previewUrl: "#"
    },
    {
      id: "3",
      name: "Visto_EUA.pdf",
      type: "application/pdf",
      uploadDate: "2023-03-22",
      size: "1.5 MB",
      previewUrl: "#"
    }
  ]);

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openPreview, setOpenPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo para upload");
      return;
    }
    
    setUploading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new document to the list
      const newDocument: Document = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type,
        uploadDate: new Date().toISOString().split('T')[0],
        size: (selectedFile.size / 1024).toFixed(0) + " KB",
        previewUrl: "#"
      };
      
      setDocuments([...documents, newDocument]);
      setSelectedFile(null);
      
      toast.success("Documento enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar documento.");
      console.error("Error uploading document:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success("Documento excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir documento.");
      console.error("Error deleting document:", error);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
          <CardTitle className="text-xl">Meus Documentos</CardTitle>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 sm:mt-0"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Adicionar Documento
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </CardHeader>
        <CardContent>
          {selectedFile && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleUpload} 
                  className="flex-1"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedFile(null)}
                  disabled={uploading}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">Nenhum documento</h3>
              <p className="text-gray-500 mt-1">
                Carregue documentos importantes como passaportes e vistos para tê-los sempre à mão.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {documents.map((doc) => (
                <div key={doc.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <div className="flex text-xs text-gray-500 mt-0.5 space-x-2">
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setOpenPreview(doc.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(doc.id)}
                      className="hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!openPreview} onOpenChange={() => setOpenPreview(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {documents.find(d => d.id === openPreview)?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="border rounded-md p-4 flex items-center justify-center h-80 bg-gray-50">
            <p className="text-center text-gray-500">
              Visualização do documento seria exibida aqui
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDocumentsTab;
