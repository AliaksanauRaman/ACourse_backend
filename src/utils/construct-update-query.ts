type ConstructUpdateQueryParams<T = unknown> = {
  tableName: string;
  modifyDto: T;
  rowId: string;
  idColumnName?: string;
};

// TODO
export const constructUpdateQuery = <T = unknown>({
  tableName,
  modifyDto,
  rowId,
  idColumnName = 'id',
}: ConstructUpdateQueryParams<T>): string => {
  const query = [`UPDATE "${tableName}"`];
  query.push('SET');

  const set = [];
  Object.keys(modifyDto).forEach((key, index) =>
    set.push(`${camelCaseToSnakeCase(key)}=$${index + 1}`),
  );

  query.push(set.join(', '));
  query.push(`WHERE ${idColumnName}='${rowId}'`);
  query.push('RETURNING *;');
  return query.join(' ');
}

const camelCaseToSnakeCase = (camelCaseString: string): string =>
  camelCaseString.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
