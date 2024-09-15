export const toCurrencyString = (val: number) => `${val / 10}rsd`;

// Input validation

export const isEmail = (value: string): boolean => {
  if (!value) return false;
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value);
}