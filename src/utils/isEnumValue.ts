export const isEnumValue = <T extends Record<string, string>>(
  enumObject: T,
  value: string,
): value is T[keyof T] => {
  return Object.values(enumObject).some((enumValue) => enumValue === value);
};
