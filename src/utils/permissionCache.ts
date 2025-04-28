
type PermissionKey = `${string}:${string}`;

interface CachedPermission {
  hasPermission: boolean;
  timestamp: number;
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

class PermissionCache {
  private cache: Map<PermissionKey, CachedPermission> = new Map();

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

  clear(): void {
    this.cache.clear();
  }
}

export const permissionCache = new PermissionCache();
