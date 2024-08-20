import React, { useContext, useEffect, useState } from 'react';
import { generateCalendarMonth } from '../Utils.jsx';
import CalendarHeader from '../Components/CalendarHeader.jsx';
import Month from '../Components/Month.jsx';
import SideBar from '../Components/SideBar.jsx';
import { MonthContext } from '../Context/MonthContext.jsx';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const MonthPage = () => {
  // Extract year and monthName from URL parameters
  const { year: urlYear, monthName } = useParams();
  // Extract monthIndex, setMonthIndex, year, and setYear from MonthContext
  const { monthIndex, setMonthIndex, year, setYear } = useContext(MonthContext);
  // State to hold the current month's calendar data
  const [currentMonth, setCurrentMonth] = useState([]);

  useEffect(() => {
    if (monthName) {
      // Create an array of month names in lowercase
      const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM').toLowerCase());
      // Find the index of the monthName in the months array
      const monthIndexFromName = months.indexOf(monthName);

      // If the monthName is valid, update the monthIndex and year
      if (monthIndexFromName !== -1) {
        setMonthIndex(monthIndexFromName);
        setYear(parseInt(urlYear, 10) || dayjs().year());
      }
    }
  }, [monthName, urlYear, setMonthIndex, setYear]);

  useEffect(() => {
    if (monthIndex !== undefined && year !== undefined) {
      // Generate the calendar data for the current month
      setCurrentMonth(generateCalendarMonth(monthIndex, year));
    }
  }, [monthIndex, year]);

  return (
    <div className='flex flex-col h-screen w-full'>
      {/* Render the CalendarHeader component */}
      <CalendarHeader />
      <div className='flex h-full w-full'>
        {/* Render the SideBar component */}
        <SideBar />
        <div className='flex-grow md:ml-0 ml-[4rem]'>
          {/* Render the Month component with currentMonth data */}
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
};

export default MonthPage;
