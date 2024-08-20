import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Array and object for month abbreviations and names
  const monthAbbreviations = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];

  const monthNames = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December'
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Task Tracker</h1>
        </div>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Click on any day to create an event.</li>
          <li>Click on any event to edit it.</li>
          <li>All the events of a particular month are shown in the sidebar.</li>
          <li>All events have icons to edit or delete them in the sidebar.</li>
          <li>You can also view the description of the events from the sidebar.</li>
          <li>If you click on a day, the sidebar will display the events for that particular month.</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <Link
            to={`${dayjs().year()}/${monthAbbreviations[dayjs().month()]}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Enter Task Tracker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
