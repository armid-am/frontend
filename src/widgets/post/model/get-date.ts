export const getDate = (data: string) =>
  data?.split("T")[0].replaceAll("-", " | ").split(" | ").reverse().join(" | ");
