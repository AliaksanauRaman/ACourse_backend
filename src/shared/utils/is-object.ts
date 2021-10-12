type UnknownObject = Record<string, unknown>;

export const isObject = (value: unknown): value is UnknownObject =>
  typeof value === 'object' && value !== null;
