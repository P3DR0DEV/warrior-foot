import { Redis } from '@upstash/redis'
import { env } from '#infra/env/index.ts'

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

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
  async set(
    key: string,
    value: string,
    ex: number = CACHE_EXPIRE,
  ): Promise<void> {
    await redis.set(key, value, {
      ex,
    });
  },

  async get<T = string>(key: string): Promise<T | null> {
    return await redis.get<T>(key);
  },

  async delete(key: string): Promise<void> {
    await redis.del(key);
  },
};