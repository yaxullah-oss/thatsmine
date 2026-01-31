const attempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return true;
  }

  if (now - entry.lastAttempt > windowMs) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  entry.lastAttempt = now;
  attempts.set(key, entry);
  return true;
}
