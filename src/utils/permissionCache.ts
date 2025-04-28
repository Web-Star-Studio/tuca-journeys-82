
type PermissionKey = `${string}:${string}`;

interface CachedPermission {
  hasPermission: boolean;
  timestamp: number;
}

// Cache duration in milliseconds (5 minutes) - can be adjusted based on needs
const CACHE_DURATION = 5 * 60 * 1000;

class PermissionCache {
  private cache: Map<PermissionKey, CachedPermission> = new Map();
  private isPreloading = false;
  private preloadPromise: Promise<void> | null = null;

  setPermission(userId: string, permission: string, hasPermission: boolean): void {
    const key: PermissionKey = `${userId}:${permission}`;
    this.cache.set(key, {
      hasPermission,
      timestamp: Date.now()
    });
  }

  getPermission(userId: string, permission: string): boolean | null {
    const key: PermissionKey = `${userId}:${permission}`;
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    // Check if cache has expired
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.hasPermission;
  }

  // Preload multiple permissions at once to reduce redundant checks
  async preloadPermissions(userId: string, permissions: string[]): Promise<void> {
    if (this.isPreloading) {
      return this.preloadPromise;
    }

    this.isPreloading = true;
    this.preloadPromise = new Promise<void>((resolve) => {
      setTimeout(async () => {
        try {
          // This would be implemented in role-helpers.ts
          // We'll just set a placeholder here
          permissions.forEach(permission => {
            // Set default permission while actually loading
            this.setPermission(userId, permission, true);
          });
        } catch (error) {
          console.error('Error preloading permissions:', error);
        } finally {
          this.isPreloading = false;
          resolve();
        }
      }, 0);
    });

    return this.preloadPromise;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const permissionCache = new PermissionCache();
