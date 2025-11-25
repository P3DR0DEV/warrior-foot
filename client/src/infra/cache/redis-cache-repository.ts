import { upstashRedis } from "@/lib/upstash-redis";

const cache = upstashRedis;

const CACHE_EXPIRE = 60 * 1 * 1440; // 1 day

export const CacheRepository = {
  /**
   * Set a key-value pair in the cache with an optional expiration time.
   *
   * @param {string} key - the key for the cache entry
   * @param {string} value - the value to be stored in the cache
   * @param {number} ex - (optional) the expiration time for the cache entry in seconds. Defaults to 1 day.
   * @return {Promise<void>} a Promise that resolves when the key-value pair is set in the cache
   */
  async set(key: string, value: string, ex: number = CACHE_EXPIRE): Promise<void> {
    await cache.set(key, value, {
      ex,
    });
  },

  async get<T = string>(key: string): Promise<T | null> {
    return await cache.get<T>(key);
  },

  async delete(key: string): Promise<void> {
    await cache.del(key);
  },
};
