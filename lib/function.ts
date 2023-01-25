export const limitDetailLength = (detail: string, limit_length: number) => {
  if (detail.length > limit_length) {
    return detail.substring(0, limit_length) + "...";
  }
  return detail;
};
