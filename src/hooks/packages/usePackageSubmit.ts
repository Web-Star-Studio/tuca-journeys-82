
import { usePackages } from "@/hooks/use-packages";
import { PackageFormValues } from "@/components/admin/packages/types";
import { adaptFormPackageToPackage } from "@/utils/packageAdapter";
import { Package } from "@/types/package";

export const usePackageSubmit = (
  packageId: number | null,
  onSuccess: () => void
) => {
  const { createPackage, updatePackage } = usePackages();

  // Form submission handler
  const handleSubmit = (data: PackageFormValues) => {
    if (packageId) {
      // Update existing package - convert from form Package to our canonical Package
      const packageData = adaptFormPackageToPackage({
        ...data,
        id: packageId,
      });
      
      updatePackage.mutate(packageData, {
        onSuccess: onSuccess,
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
        onSuccess: onSuccess,
      });
    }
  };

  // Check if the form is being submitted
  const isSubmitting = createPackage.isPending || updatePackage.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
};
