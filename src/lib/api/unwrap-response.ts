/**
 * Some endpoints wrap their payload in `{ success, message, data }` while the
 * media module returns it directly, so reads go through this rather than
 * assuming one shape.
 */
export function unwrapResponse<T>(payload: T | { data: T }): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    (payload as { data?: unknown }).data !== undefined
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

type ListEnvelope<T> = {
  count?: number;
  count_is_capped?: boolean;
  source?: string;
  has_more?: boolean;
  next_cursor?: string | null;
  next: string | null;
  previous: string | null;
  results: T[];
};

/**
 * The cursor for the next page, from whichever form the endpoint used: a raw
 * `next_cursor` token, or a DRF `next` URL carrying it as a query param.
 */
export function readNextCursor(
  data:
    | { next_cursor?: string | null; next?: string | null }
    | null
    | undefined,
): string | undefined {
  if (!data) return undefined;

  if (data.next_cursor) return data.next_cursor;
  if (!data.next) return undefined;

  try {
    return new URL(data.next).searchParams.get('cursor') ?? undefined;
  } catch {
    // A relative `next` won't parse as an absolute URL; read its query directly.
    return (
      new URLSearchParams(data.next.split('?')[1] ?? '').get('cursor') ??
      undefined
    );
  }
}

/**
 * Normalises the list shapes seen across the API — a paginated envelope, a
 * wrapped one, or a bare array — into a single envelope. Always returns
 * `results`, so a query built on it can never resolve to undefined.
 */
export function unwrapListResponse<T>(payload: unknown): ListEnvelope<T> {
  const body = unwrapResponse(payload as ListEnvelope<T> | { data: unknown });

  if (Array.isArray(body)) {
    return { next: null, previous: null, results: body as T[] };
  }

  if (body && typeof body === 'object') {
    const envelope = body as Partial<ListEnvelope<T>>;

    return {
      count: envelope.count,
      count_is_capped: envelope.count_is_capped,
      source: envelope.source,
      has_more: envelope.has_more,
      next_cursor: envelope.next_cursor ?? null,
      next: envelope.next ?? null,
      previous: envelope.previous ?? null,
      results: Array.isArray(envelope.results) ? envelope.results : [],
    };
  }

  return { next: null, previous: null, results: [] };
}
