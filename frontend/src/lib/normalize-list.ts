export function normalizeList<T>(value: unknown, key: string): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nested = record[key] ?? record.data;
    if (Array.isArray(nested)) {
      return nested as T[];
    }
  }

  return [];
}