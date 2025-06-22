export const generateSlug = (
  input: string,
  separator: string = "_"
): string => {
  return input
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Remove unwanted characters
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(new RegExp(`${separator}+`, "g"), separator) // Replace multiple separators
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), ""); // Remove leading/trailing separators
};
