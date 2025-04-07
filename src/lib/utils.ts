
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function isRouteActive(currentPath: string, routePath: string): boolean {
  if (routePath === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(routePath);
}
