
import { usePackages } from "@/hooks/use-packages";
import { PackageFormValues } from "@/components/admin/packages/types";
import { Package as OldPackage } from "@/data/types/packageTypes";
import { adaptFormPackageToPackage } from "@/utils/packageAdapter";

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
        id: packageId,
        ...data,
      } as OldPackage);
      
      updatePackage.mutate(packageData, {
        onSuccess: onSuccess,
      });
    } else {
      // Create new package - convert from form Package to our canonical Package
      const packageData = adaptFormPackageToPackage(data as OldPackage);
      createPackage.mutate(packageData, {
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
