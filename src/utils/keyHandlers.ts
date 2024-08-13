// ENTER KEY
export const handleAddEnter = (
  event: React.KeyboardEvent<HTMLInputElement>,
  addTodo: () => void
): void => {
  const code = event.keyCode || event.which;
  if (code === 13) {
    addTodo();
  }
};
