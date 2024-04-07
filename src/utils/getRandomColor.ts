export function getRandomColor() {
  const colors = [
    "blue",
    "green",
    "success",
    "primary",
    "danger",
    "warning",
    "orange",
    "red",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
