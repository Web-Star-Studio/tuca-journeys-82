
import React, { useState } from "react";
import { Search, Plus, FolderOpen, Image as ImageIcon, FileText, Trash2, Upload } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample media data
const dummyMedia = [
  {
    id: 1,
    name: "hero-image-1.jpg",
    type: "image",
    url: "/hero-noronha-1.jpg",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploaded_at: "2023-06-15T14:30:00",
  },
  {
    id: 2,
    name: "tour-diving.jpg",
    type: "image",
    url: "/tour-diving.jpg",
    size: "0.8 MB",
    dimensions: "1400x800",
    uploaded_at: "2023-06-20T11:15:00",
  },
  {
    id: 3,
    name: "accommodation-info.pdf",
    type: "document",
    url: "#",
    size: "2.3 MB",
    dimensions: null,
    uploaded_at: "2023-07-05T09:45:00",
  },
  {
    id: 4,
    name: "hero-noronha-2.jpg",
    type: "image",
    url: "/hero-noronha-2.jpg",
    size: "1.5 MB",
    dimensions: "1920x1080",
    uploaded_at: "2023-07-10T16:20:00",
  },
  {
    id: 5,
    name: "tour-trail.jpg",
    type: "image",
    url: "/tour-trail.jpg",
    size: "0.9 MB",
    dimensions: "1400x800",
    uploaded_at: "2023-07-15T10:30:00",
  },
  {
    id: 6,
    name: "price-list.pdf",
    type: "document",
    url: "#",
    size: "1.1 MB",
    dimensions: null,
    uploaded_at: "2023-07-20T13:45:00",
  },
  {
    id: 7,
    name: "about-team.jpg",
    type: "image",
    url: "/about-team.jpg",
    size: "1.3 MB",
    dimensions: "1600x900",
    uploaded_at: "2023-07-25T15:10:00",
  },
  {
    id: 8,
    name: "hero-noronha-3.jpg",
    type: "image",
    url: "/hero-noronha-3.jpg",
    size: "1.4 MB",
    dimensions: "1920x1080",
    uploaded_at: "2023-08-01T12:00:00",
  },
];

const Media = () => {
  const [mediaItems] = useState(dummyMedia);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter media based on search query
  const filteredMedia = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle selection of a media item
  const toggleSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Select all media items
  const selectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map((item) => item.id));
    }
  };

  // Handle delete
  const handleDelete = () => {
    console.log("Deleting items:", selectedItems);
    // Here we would call the API to delete the selected items
    setSelectedItems([]);
    setDeleteDialogOpen(false);
  };

  // Handle upload
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Upload file");
    // Here we would call the API to upload the file
    setUploadDialogOpen(false);
  };

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-tuca-ocean-blue" />;
      case "document":
        return <FileText className="h-6 w-6 text-tuca-deep-blue" />;
      default:
        return <FolderOpen className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <AdminLayout pageTitle="Gerenciar Mídia">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar arquivos..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>
                  Upload files to your media library.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Arraste arquivos aqui ou clique para fazer upload
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    type="button"
                  >
                    Selecionar Arquivos
                  </Button>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Upload</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {selectedItems.length > 0 && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="gap-1">
                  <Trash2 className="h-4 w-4" />
                  <span>Excluir ({selectedItems.length})</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja excluir {selectedItems.length} {selectedItems.length === 1 ? "arquivo" : "arquivos"}?
                    Esta ação não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md border p-4">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center">
            <Checkbox
              id="select-all"
              checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
              onCheckedChange={selectAll}
            />
            <label
              htmlFor="select-all"
              className="ml-2 text-sm font-medium"
            >
              {selectedItems.length === 0
                ? "Selecionar todos"
                : `${selectedItems.length} ${selectedItems.length === 1 ? "selecionado" : "selecionados"}`}
            </label>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden cursor-pointer transition-all ${
                  selectedItems.includes(item.id)
                    ? "ring-2 ring-tuca-ocean-blue"
                    : "hover:border-tuca-light-blue"
                }`}
                onClick={() => toggleSelection(item.id)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        className="data-[state=checked]:bg-tuca-ocean-blue data-[state=checked]:text-white"
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleSelection(item.id)}
                      />
                    </div>
                    {item.type === "image" ? (
                      <div className="h-32 relative">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        {getFileIcon(item.type)}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium truncate" title={item.name}>
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredMedia.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Nenhum arquivo encontrado.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                  selectedItems.includes(item.id)
                    ? "bg-tuca-light-blue/30 border-tuca-ocean-blue"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleSelection(item.id)}
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  className="mr-3"
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleSelection(item.id)}
                />
                <div className="h-12 w-12 flex items-center justify-center mr-3">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    getFileIcon(item.type)
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium" title={item.name}>
                    {item.name}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-xs mr-2">
                      {item.type}
                    </Badge>
                    <span className="mr-2">{item.size}</span>
                    {item.dimensions && (
                      <span className="mr-2">{item.dimensions}</span>
                    )}
                    <span>
                      {new Date(item.uploaded_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredMedia.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum arquivo encontrado.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Media;
