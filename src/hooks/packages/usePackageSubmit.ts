
import { usePackages } from "@/hooks/use-packages";
import { PackageFormValues } from "@/components/admin/packages/types";
import { Package } from "@/data/types/packageTypes";

export const usePackageSubmit = (
  packageId: number | null,
  onSuccess: () => void
) => {
  const { createPackage, updatePackage } = usePackages();

  // Form submission handler
  const handleSubmit = (data: PackageFormValues) => {
    if (packageId) {
      // Update existing package
      updatePackage.mutate(
        {
          id: packageId,
          ...data,
        } as Package,
        {
          onSuccess: onSuccess,
        }
      );
    } else {
      // Create new package
      createPackage.mutate(data as Omit<Package, "id">, {
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
