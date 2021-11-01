export const isPresent = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const arrayToMap = <T extends string>(properties: T[]): { [K in T]: K } => {
  return properties.reduce((result, curr) => {
    result[curr] = curr;

    return result;
  }, {} as { [K in T]: K });
};
