
import { Package } from "./types/packageTypes";
import { romanticPackages } from "./packages/romanticPackages";
import { adventurePackages } from "./packages/adventurePackages";
import { familyPackages } from "./packages/familyPackages";
import { premiumPackages } from "./packages/premiumPackages";
import { budgetPackages } from "./packages/budgetPackages";

// Export the Package type
export type { Package };

// Combine all packages into one array
export const packages: Package[] = [
  ...romanticPackages,
  ...adventurePackages,
  ...familyPackages,
  ...premiumPackages,
  ...budgetPackages
];

// Export individual package categories for easier filtering
export {
  romanticPackages,
  adventurePackages,
  familyPackages,
  premiumPackages,
  budgetPackages
};

// Helper function to find a package by ID
export const getPackageById = (id: number): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

// Helper function to get packages by category
export const getPackagesByCategory = (category: string): Package[] => {
  switch (category.toLowerCase()) {
    case 'romantic':
      return romanticPackages;
    case 'adventure':
      return adventurePackages;
    case 'family':
      return familyPackages;
    case 'premium':
      return premiumPackages;
    case 'budget':
      return budgetPackages;
    default:
      return packages;
  }
};

// Helper function to get featured packages (first 3)
export const getFeaturedPackages = (limit: number = 3): Package[] => {
  return packages.slice(0, limit);
};
