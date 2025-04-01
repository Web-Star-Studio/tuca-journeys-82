
import { useState, useEffect } from "react";
import { Package, packages } from "@/data/packages";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/use-toast";

export const usePackageDetail = (id: string | undefined) => {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const foundPackage = packages.find((pkg) => pkg.id === Number(id));
    setPackageData(foundPackage || null);
    setIsLoading(false);

    // Check if package is in wishlist
    if (foundPackage) {
      const inWishlist = wishlistItems.some(
        (item) => item.id === foundPackage.id && item.type === "package"
      );
      setIsInWishlist(inWishlist);
    }
  }, [id, wishlistItems]);

  const handleWishlistToggle = () => {
    if (!packageData) return;

    if (isInWishlist) {
      removeFromWishlist(packageData.id, "package");
      toast({
        title: "Removido da lista de desejos",
        description: `${packageData.title} foi removido da sua lista de desejos.`,
      });
    } else {
      addToWishlist({
        id: packageData.id,
        type: "package",
        name: packageData.title,
        image: packageData.image
      });
      toast({
        title: "Adicionado à lista de desejos",
        description: `${packageData.title} foi adicionado à sua lista de desejos.`,
      });
    }
  };

  return {
    packageData,
    isLoading,
    isInWishlist,
    handleWishlistToggle
  };
};
