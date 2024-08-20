import React from 'react';
import dayjs from 'dayjs';

/**
 * Generates a 2D array (matrix) representing a calendar month.
 * @param {number} [month=CurrentMonth] - The month to generate (0-11), defaults to the current month.
 * @param {number} [year=CurrentYear] - The year to generate, defaults to the current year.
 * @returns {array[]} A 2D array with rows representing weeks and columns representing days of the week.
 */
export const generateCalendarMonth = (month = dayjs().month(), year = dayjs().year()) => {
  // Get the day of the week (0-6) of the first day of the month
  const firstDayOfMonthIndex = dayjs(new Date(year, month, 1)).day();
  
  // Initialize the day counter to the first day of the month
  let dayCounter = 1 - firstDayOfMonthIndex;

  // Create a matrix for 5 rows and 7 columns
  const calendarMatrix = Array.from({ length: 5 }, () => {
    return Array.from({ length: 7 }, () => {
      const currentDate = new Date(year, month, dayCounter++);
      return dayjs(currentDate); // Create a dayjs object for the current day
    });
  });

  return calendarMatrix;
};
