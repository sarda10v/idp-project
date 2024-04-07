import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату и время в строку "dd.MM.yyyy HH:mm" на русском языке.
 * @param {Date | string | number} inputDate - Дата для форматирования. Может быть объектом Date, строкой или числом.
 * @returns {string} Строка даты и времени в формате "dd.MM.yyyy HH:mm".
 */
export const formatDateAndTimeToRussian = (
  inputDate: Date | string | number
): string => {
  // Преобразование входного значения в объект Date
  const dateObj = new Date(inputDate);
  // Форматирование и возвращение результата
  return format(dateObj, "dd.MM.yyyy HH:mm", {
    locale: ru,
  });
};
