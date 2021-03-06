import camelcase from 'camelcase';

export const convertFromSnakeCaseToCamelCase = <T>(
  snakeCaseValue: Record<string, unknown>,
): T => {
  return Object.keys(snakeCaseValue).reduce<T>((camelCaseValue, nextKey) => {
    return {
      ...camelCaseValue,
      [camelcase(nextKey)]: snakeCaseValue[nextKey],
    };
  }, {} as T);
};
