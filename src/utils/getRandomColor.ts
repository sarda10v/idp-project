export function getRandomColor() {
  const colors = [
    "neutral",
    "success",
    "primary",
    "danger",
    "warning",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
