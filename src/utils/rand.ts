export const random = {
  int(min = 0, max = 100) {
    return min + Math.floor(Math.random() * (max - min));
  },
};
