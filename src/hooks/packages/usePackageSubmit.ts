
import { usePackages } from "@/hooks/use-packages";
import { PackageFormValues } from "@/components/admin/packages/types";
import { adaptFormPackageToPackage } from "@/utils/packageAdapter";
import { Package } from "@/types/package";
import { toast } from 'sonner';

export const usePackageSubmit = (
  packageId: number | null,
  onSuccess: () => void
) => {
  const { createPackage, updatePackage } = usePackages();

  // Form submission handler
  const handleSubmit = (data: PackageFormValues) => {
    try {
      if (packageId) {
        // Update existing package - convert from form Package to our canonical Package
        const packageData = adaptFormPackageToPackage({
          ...data,
          id: packageId,
        });
        
        updatePackage.mutate(packageData, {
          onSuccess: () => {
            toast.success("Pacote atualizado com sucesso!");
            onSuccess();
          },
          onError: (error) => {
            console.error("Error updating package:", error);
            toast.error("Erro ao atualizar o pacote. Tente novamente.");
          }
        });
      } else {
        // Create new package - convert from form Package to our canonical Package
        const packageData = adaptFormPackageToPackage({
          ...data,
          id: -1, // Temporary ID, will be replaced by database
        });
        
        // Create a new package without the ID
        const { id, ...packageWithoutId } = packageData;
        createPackage.mutate(packageWithoutId as Omit<Package, 'id'>, {
          onSuccess: () => {
            toast.success("Pacote criado com sucesso!");
            onSuccess();
          },
          onError: (error) => {
            console.error("Error creating package:", error);
            toast.error("Erro ao criar o pacote. Tente novamente.");
          }
        });
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Ocorreu um erro ao processar o formulário. Tente novamente.");
    }
  };

  // Check if the form is being submitted
  const isSubmitting = createPackage.isPending || updatePackage.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
};
