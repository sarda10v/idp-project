import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату в строку "d MMMM yyyy 'г.' на русском языке.
 * @param {Date | string | number} inputDate - Дата для форматирования. Может быть объектом Date, строкой или числом.
 * @returns {string} Строка даты в формате "d MMMM yyyy 'г.'".
 */
export const formatDateToRussian = (
  inputDate: Date | string | number
): string => {
  // Преобразование входного значения в объект Date
  const dateObj = new Date(inputDate);
  // Форматирование и возвращение результата
  return format(dateObj, "d MMMM yyyy 'г.'", {
    locale: ru,
  });
};
