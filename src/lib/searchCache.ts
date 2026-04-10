/**
 * Local Storage Cache Manager
 * Handles caching of search results with expiration
 */

export interface CachedSearchResult {
  query: string;
  data: any[];
  timestamp: number;
  expiresAt: number;
}

// Cache expiration time: 24 hours
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "search_cache_";

/**
 * Get cached search results
 * @param query - The search query
 * @returns Cached data or null if not found or expired
 */
export function getCachedSearchResults(query: string): any[] | null {
  try {
    const cacheKey = `${CACHE_PREFIX}${query.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);

    if (!cached) {
      console.log(`📭 No cache found for: "${query}"`);
      return null;
    }

    const cachedData: CachedSearchResult = JSON.parse(cached);

    // Check if cache is expired
    if (Date.now() > cachedData.expiresAt) {
      console.log(`⏰ Cache expired for: "${query}"`);
      localStorage.removeItem(cacheKey);
      return null;
    }

    console.log(`✅ Using cached results for: "${query}"`);
    return cachedData.data;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

/**
 * Cache search results
 * @param query - The search query
 * @param data - The data to cache
 */
export function cacheSearchResults(query: string, data: any[]): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${query.toLowerCase()}`;
    const cacheData: CachedSearchResult = {
      query,
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + CACHE_EXPIRATION_TIME,
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    console.log(`💾 Cached results for: "${query}" (${data.length} items)`);
  } catch (error) {
    console.error("Error writing to cache:", error);
    // Fail silently - app will still work without cache
  }
}

/**
 * Clear cache for a specific search
 * @param query - The search query to clear cache for
 */
export function clearSearchCache(query: string): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${query.toLowerCase()}`;
    localStorage.removeItem(cacheKey);
    console.log(`🗑️ Cleared cache for: "${query}"`);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}

/**
 * Clear all search caches
 */
export function clearAllSearchCache(): void {
  try {
    const keys = Object.keys(localStorage);
    let clearedCount = 0;

    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
        clearedCount++;
      }
    });

    console.log(`🗑️ Cleared ${clearedCount} search caches`);
  } catch (error) {
    console.error("Error clearing all caches:", error);
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { count: number; totalSize: string } {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    let totalSize = 0;
    cacheKeys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
      }
    });

    return {
      count: cacheKeys.length,
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
    };
  } catch {
    return { count: 0, totalSize: "0 KB" };
  }
}
