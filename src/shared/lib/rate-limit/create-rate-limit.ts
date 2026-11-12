import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export function createRateLimit(
  prefix: string,
  limiter: ReturnType<typeof Ratelimit.slidingWindow> = Ratelimit.slidingWindow(
    10,
    "10 m",
  ),
) {
  return new Ratelimit({
    redis,
    limiter,
    analytics: true,
    prefix: `ratelimit:${prefix}`,
  });
}
