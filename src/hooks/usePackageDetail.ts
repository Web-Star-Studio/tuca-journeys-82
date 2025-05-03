
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Package } from "@/types/package";
import { useWishlist } from "@/contexts/WishlistContext";
import { packageService } from "@/services/package-service";

export const usePackageDetail = () => {
  const [package_, setPackage] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams<{ id: string }>();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await packageService.getPackageById(parseInt(id));
        setPackage(data);
      } catch (err) {
        console.error("Error fetching package:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch package"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const toggleWishlist = () => {
    if (!package_) return;
    
    const isInList = isInWishlist(package_.id, "package");
    
    if (isInList) {
      removeFromWishlist(package_.id, "package");
    } else {
      addToWishlist({
        id: package_.id,
        type: "package",
        title: package_.title,
        image: package_.image_url
      });
    }
  };

  return {
    package: package_,
    isLoading,
    error,
    isInWishlist: package_ ? isInWishlist(package_.id, "package") : false,
    toggleWishlist
  };
};
