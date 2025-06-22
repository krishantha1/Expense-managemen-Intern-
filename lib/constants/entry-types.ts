export const entryTypes = [
  {
    value: "SINGLE",
    label: "Single Entry", // Fixed: lable -> label
  },
  {
    value: "MULTIPLE",
    label: "Multiple Entry", // Fixed: lable -> label
  },
] as const;

export type EntryTypes = (typeof entryTypes)[number]["value"];
