import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { MonthContext } from '../Context/MonthContext';
import { useNavigate } from 'react-router-dom';

const CalendarHeader = () => {
  // Extract state and functions from MonthContext
  const { monthIndex, setMonthIndex, year, setYear, setSelectedDay } = useContext(MonthContext);
  const navigate = useNavigate();

  // Function to handle month changes (previous or next)
  const handleMonthChange = (change) => {
    let newMonthIndex = monthIndex + change;
    let newYear = year;

    // Adjust month and year if necessary
    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      newYear -= 1;
    } else if (newMonthIndex > 11) {
      newMonthIndex = 0;
      newYear += 1;
    }

    // Update month and year in context
    setMonthIndex(newMonthIndex);
    setYear(newYear);

    // Format new month to lowercase
    const newMonth = dayjs().month(newMonthIndex).format('MMM').toLowerCase();

    // Navigate to the new month/year view
    navigate(`/${newYear}/${newMonth}`);
    setSelectedDay(null); // Reset selected day
  };

  // Function to navigate to the current month and year
  const handleGoToToday = () => {
    const today = dayjs();

    // Update month and year to today
    setMonthIndex(today.month());
    setYear(today.year());

    // Navigate to the current month/year view
    navigate(`/${today.year()}/${today.format('MMM').toLowerCase()}`);
    setSelectedDay(null); // Reset selected day
  };

  return (
    <header className='bg-white shadow-md py-4 px-6'>
      {/* Header section with logo and home button */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src="../public/HeaderLogo.png"
            alt="Logo"
            className='h-12 w-auto'
          />
          <h1 className='text-4xl font-semibold text-gray-800 ml-4'>
            TaskTracker
          </h1>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      {/* Calendar controls for navigating months and viewing current month */}
      <div className='mt-4 grid grid-cols-3 items-center'>
        <div className='flex justify-between'>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md py-2 px-4"
            onClick={handleGoToToday}
          >
            Today
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md py-2 px-4"
            onClick={() => handleMonthChange(-1)}
          >
            Previous
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md py-2 px-4"
            onClick={() => handleMonthChange(1)}
          >
            Next
          </button>
        </div>
        {/* Display the current month and year */}
        <h2 className='text-2xl font-semibold text-gray-800 col-span-3 text-center'>
          {dayjs().month(monthIndex).year(year).format('MMMM YYYY')}
        </h2>
      </div>
    </header>
  );
};

export default CalendarHeader;
